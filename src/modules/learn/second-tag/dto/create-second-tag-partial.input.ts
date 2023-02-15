import { BasicEntity } from '@common/input/basic-entity';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateSecondTagPartialInput extends BasicEntity {}
