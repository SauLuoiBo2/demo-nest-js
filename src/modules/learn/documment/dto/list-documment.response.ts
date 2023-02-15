import { MetaList } from '@common/meta-list';
import { Field, ObjectType } from '@nestjs/graphql';
import { Documment } from '../entities/documment.entity';

@ObjectType()
export class ListDocummentResponse extends MetaList {
  @Field(() => [Documment])
  data: Documment[];
}
