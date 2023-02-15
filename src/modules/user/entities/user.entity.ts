import { StatusE } from './../../auth/status/status.enum';
import { RoleE } from 'src/modules/auth/role/roles.enum';
import { checkRoleMiddleware } from '@configs/graphql/middleware/check-role.middleware';
import { ObjectType, Field, Int, Extensions } from '@nestjs/graphql';
import { User as UserP } from '@prisma/client';

@ObjectType()
export class User implements UserP {
  @Field({ nullable: true })
  firstName: string;
  @Field({ nullable: true })
  lastName: string;
  @Field({ nullable: true })
  hashedPassword: string;
  @Field({ nullable: true })
  hashedRefreshToken: string;
  @Field({ nullable: true })
  forgotToken: string;
  @Field()
  email: string;
  @Field()
  isGoogle: boolean;
  @Field({ nullable: true })
  emailedAt: Date;
  @Field({ nullable: true })
  avatar: string;
  @Field({ middleware: [checkRoleMiddleware] })
  @Extensions({ role: RoleE.Admin })
  updatedAt: Date;
  @Field()
  createdAt: Date;
  @Field(() => Int, { description: 'Id user', nullable: true })
  id: number;
  @Field({ nullable: true })
  role: RoleE;
  @Field({ nullable: true })
  status: StatusE;
}
