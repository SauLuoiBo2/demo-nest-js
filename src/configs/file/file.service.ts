import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { FileUpload } from 'graphql-upload';
import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import slugify from 'slugify';
import * as path from 'path';
import { v4 } from 'uuid';
// import Mux from '@mux/mux-node';
import Mux from '@mux/mux-node';
// import fs from 'fs';
import fetch from 'node-fetch';
import { ListResourceClouldinary } from './models';

const validMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
enum ResolutionType {
  LOWEST = 10,
  LOW = 25,
  MEDIUM = 50,
  HIGH = 75,
  HIGHEST = 100,
}

@Injectable()
export class FileService {
  private _getFileName(originalName: string) {
    const fileExtension: string = path.extname(originalName);
    const baseName = path.basename(originalName, fileExtension);
    const randomNum = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    const slugName = slugify(baseName, { lower: true, strict: true });
    return slugName + '_' + v4() + '_' + randomNum;
  }

  private async _validateImage(file: FileUpload) {
    const { createReadStream, mimetype, filename } = await file;
    const stream = createReadStream();

    if (!validMimeTypes.includes(mimetype)) {
      throw new BadRequestException('Can not upload this mime type');
    }

    const MaxAllowedFileSize = 10000000;
    try {
      await this.checkFileSize(createReadStream, MaxAllowedFileSize);
    } catch (error) {
      throw new BadRequestException(
        'Can not upload file larger than ' +
          MaxAllowedFileSize / 1000000 +
          'MB',
      );
    }

    return { stream, filename };
  }

  private async checkFileSize(
    streams: FileUpload['createReadStream'],
    maxSize: number,
  ) {
    await new Promise((resolves, rejects) => {
      let filesize = 0;
      const stream = streams();
      stream.on('data', (chunk: Buffer) => {
        filesize += chunk.length;
        if (filesize > maxSize) {
          rejects(filesize);
        }
      });
      stream.on('end', () => resolves(filesize));
      stream.on('error', rejects);
    });
  }

  async getImages(folder: string): Promise<ListResourceClouldinary> {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    try {
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: folder,
      });
      return result;
    } catch (error) {
      throw new BadRequestException('Can not get image from cloudinary');
    }
  }

  async uploadImage(file: FileUpload, folder: string) {
    const { stream, filename } = await this._validateImage(file);
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    try {
      const fileName = this._getFileName(filename);
      const streamUpload: UploadApiResponse = await new Promise(
        (resolve, reject) => {
          const cloudStream = cloudinary.uploader.upload_stream(
            {
              folder: folder,
              public_id: fileName,
            },
            function (err, fileUploaded) {
              if (err) {
                reject(err);
              }

              resolve(fileUploaded);
            },
          );

          stream.pipe(cloudStream);
        },
      );

      const publicId = streamUpload.public_id;

      return publicId;
    } catch (err) {
      console.log(err);
      throw new BadRequestException();
    }
  }

  async updateImage(file: FileUpload, folder: string, image: string) {
    await this.deleteImage(image);
    return await this.uploadImage(file, folder);
  }

  async getImage(image: string) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    try {
      const result = await cloudinary.api.resource(image);
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Can not get image from cloudinary');
    }
  }

  async getImageResolution(image: string, resolution: ResolutionType) {
    if (typeof resolution !== 'number') {
      throw new BadRequestException('Resolution must be a number');
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    try {
      const result = cloudinary.image(image, { quality: resolution });
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Can not get image from cloudinary');
    }
  }

  async deleteImage(image: string) {
    try {
      await cloudinary.uploader.destroy(image);
    } catch (err) {
      console.log(err);
      throw new BadRequestException();
    }
  }

  async getUpdateNameFile(
    file: FileUpload | undefined,
    oldName: string,
    keyName: string,
    folder?: string,
  ) {
    if (file) {
      if (!!oldName) {
        const imgName = await this.updateImage(file, folder || '', oldName);

        return { [keyName]: imgName };
      } else {
        const imgName = await this.uploadImage(file, folder || '');
        return { [keyName]: imgName };
      }
    } else {
      return {};
    }
  }

  async getCreateNameFile(file: FileUpload, keyName: string, folder?: string) {
    if (file) {
      const imgName = await this.uploadImage(file, folder || '');
      return { [keyName]: imgName };
    } else {
      return { [keyName]: '' };
    }
  }

  async uploadVideo(file: FileUpload) {
    const accessToken = process.env.MUX_TOKEN_ID;
    const secret = process.env.MUX_TOKEN_SECRET;
    const { Video, Data } = new Mux(accessToken, secret);

    const { createReadStream, mimetype, filename } = await file;
    const stream = createReadStream();

    try {
      const upload = await Video.Uploads.create({
        new_asset_settings: { playback_policy: 'public' },
      });

      await fetch(upload.url, { method: 'PUT', body: stream });
      const updatedUpload = await Video.Uploads.get(upload.id);

      console.log(updatedUpload);
      // Or you could decide to go get additional information about that new asset you created.
      const asset = await Video.Assets.get(updatedUpload['asset_id']);
      console.log(asset);
      return upload;
    } catch (error) {
      console.log(error);
    }
  }
}
