import { Resolver, Query } from '@nestjs/graphql';

import { Public } from '@modules/auth/role/public.decorator';
import { EmailService } from './email.service';

@Resolver()
export class EmailResolver {
  constructor(private readonly emailService: EmailService) {}

  @Query(() => String, { name: 'email' })
  @Public()
  async testEmail() {
    const result = await this.emailService.sendUserConfirmation(
      'nthu58596@gmail.com',
      '123',
      'HIHI',
    );
    console.log(result);
    return result;
  }
}
