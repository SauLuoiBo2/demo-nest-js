import { ContentFolderEnum } from './models/index';
import { Resolver, Mutation, Args, Int, Query } from '@nestjs/graphql';
import { ContentService } from './content.service';
import { Content } from './entities/content.entity';

import { FileUpload } from 'graphql-upload';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { Public } from '@modules/auth/role/public.decorator';
import { ImagesCloudinaryResponse } from '@configs/file/dto/images-cloudinary.response';

@Resolver(() => Content)
export class ContentResolver {
  constructor(private readonly contentService: ContentService) {}

  @Query(() => ImagesCloudinaryResponse)
  @Public()
  async getImagesOnRichtext(
    @Args('id', { type: () => Int }) id: number,
    @Args({ name: 'folder', type: () => String })
    folder: ContentFolderEnum,
  ) {
    return this.contentService.getImagesOnRichtext(id, folder);
  }

  @Mutation(() => String)
  @Public()
  uploadImageOnRichtext(
    @Args({ name: 'image', type: () => GraphQLUpload })
    image: FileUpload,
    @Args('id', { type: () => Int }) id: number,
    @Args({ name: 'folder' })
    folder: string,
  ) {
    return this.contentService.uploadImageOnRichtext(id, folder, image);
  }

  @Mutation(() => String)
  @Public()
  removeImageOnRichtext(
    @Args({ name: 'name' })
    name: string,
  ) {
    return this.contentService.removeImageOnRichtext(name);
  }
}
