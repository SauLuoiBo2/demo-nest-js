import { ImageCloudinaryResponse } from '@configs/file/dto/image-cloudinary.response';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ImagesCloudinaryResponse {
  @Field(() => [ImageCloudinaryResponse], { nullable: true })
  resources: [ImageCloudinaryResponse];
}
