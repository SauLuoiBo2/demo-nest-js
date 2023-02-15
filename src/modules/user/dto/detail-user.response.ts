import { ObjectType, OmitType } from '@nestjs/graphql';
import { User } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class DetailUserResponse extends OmitType(User, [
  'hashedPassword',
  'hashedRefreshToken',
] as const) {}
