import { EmailResolver } from './email.resolver';
import { EmailService } from './email.service';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'email-smtp.us-east-1.amazonaws.com',
        port: 2587,
        auth: {
          user: 'AKIAY4OHRSKACUWF4WWE',
          pass: 'BM+U4fGIZd4I38edpgWcEn0VLaDvJsG652La7M3y76Nj',
        },
      },
      template: {
        dir: join(__dirname, '../../../src/assets/emails'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [EmailService, EmailResolver],
  exports: [EmailService],
})
export class EmailModule {}
