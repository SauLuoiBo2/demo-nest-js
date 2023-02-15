import { FileService } from './file.service';
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { Public } from '@modules/auth/role/public.decorator';
import { FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';

@Resolver()
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @Mutation(() => String)
  @Public()
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
    @Args({ name: 'folder' })
    folder: string,
  ) {
    return await this.fileService.uploadImage(file, folder);
  }

  @Query(() => String)
  @Public()
  async getImageResolution(
    @Args({ name: 'image' })
    image: string,
    @Args({ name: 'resolution' })
    resolution: number,
  ) {
    return await this.fileService.getImageResolution(image, resolution);
  }

  @Query(() => String)
  @Public()
  async getImage(
    @Args({ name: 'image' })
    image: string,
  ) {
    const test = await this.fileService.getImage(image);
    console.log(test);
    return 'ok';
  }

  @Mutation(() => String)
  @Public()
  async uploadVideo(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
  ) {
    const result = await this.fileService.uploadVideo(file);
    console.log(result);
    return 'ok';
  }

  // @Mutation(() => [String])
  // @Public()
  // async uploadMultiFile(
  //   @Args({ name: 'file', type: () => GraphQLUpload })
  //   file: FileUpload,
  //   @Args({ name: 'folder' })
  //   folder: string,
  // ) {
  //   return await this.fileService.uploadMultiImage(file, folder);
  // }

  @Mutation(() => String)
  @Public()
  async uploadMultiFile(
    @Args({ name: 'files', type: () => GraphQLUpload })
    files: Promise<FileUpload>[],
  ) {
    // const { createReadStream, mimetype, filename } = await files;
    // const stream = createReadStream();
    // console.log('a');
    // console.log(files);
    return await Promise.all(
      files.map(async (img: Promise<FileUpload>): Promise<Promise<string>> => {
        const { filename, mimetype, encoding, createReadStream } = await img;
        console.log('attachment:', filename, mimetype, encoding);
        const stream = createReadStream();
        return new Promise((resolve, reject) => {
          stream
            .on('end', () => {
              console.log('ReadStream Ended');
            })
            .on('close', () => {
              console.log('ReadStream Closed');
            })
            .on('error', (err) => {
              console.error('ReadStream Error', err);
            })
            .pipe(createWriteStream(`./upload/${filename}`))
            .on('end', () => {
              console.log('WriteStream Ended');
              resolve('end');
            })
            .on('close', () => {
              console.log('WriteStream Closed');
              resolve('close');
            })
            .on('error', (err) => {
              console.log('WriteStream Error', err);
              reject('error');
            });
        });
      }),
    );
  }
}
