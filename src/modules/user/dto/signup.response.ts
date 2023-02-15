import { ObjectType, OmitType } from '@nestjs/graphql';
import { User } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class SignupResponse extends OmitType(User, [
  'hashedPassword',
] as const) {}
