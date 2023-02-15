import { ContentFolderEnum } from './models/index';
import { FileService } from '@configs/file/file.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class ContentService {
  constructor(private fileService: FileService) {}

  private _folderRichtext = 'content';

  async getImagesOnRichtext(id: number, folder: ContentFolderEnum) {
    const folderUri = this._folderRichtext + '/' + folder + '/' + id;
    const result = await this.fileService.getImages(folderUri);
    return result;
  }

  uploadImageOnRichtext(id: number, folder: string, image: FileUpload) {
    const folderUri = this._folderRichtext + '/' + folder + '/' + id;
    return this.fileService.uploadImage(image, folderUri);
  }

  async removeImageOnRichtext(name: string) {
    try {
      await this.fileService.deleteImage(name);
      return 'deleted ';
    } catch (error) {
      throw new ForbiddenException('error');
    }
  }
}
