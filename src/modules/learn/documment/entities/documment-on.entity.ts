import { Documment } from '@modules/learn/documment/entities/documment.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class DocummentOn {
  @Field(() => Int, { nullable: true })
  docummentId: number;

  @Field(() => Documment, { nullable: true })
  documment: Documment;
}
