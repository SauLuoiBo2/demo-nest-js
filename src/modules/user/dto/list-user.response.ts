import { MetaList } from '@common/meta-list';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class ListUserResponse extends MetaList {
  @Field(() => [User])
  data: User[];
}
