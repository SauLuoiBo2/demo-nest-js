import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) { }

  async sendUserConfirmation(email: string, token: string, name: string) {
    const url = `http:localhost:3000/auth/confirm?token=${token}`;

    try {
      const response = await this.mailerService.sendMail({
        to: email,
        from: 'minhdev22@gmail.com',
        subject: 'Welcome to Nice App! Confirm your Email',
        template: './email',
        context: {
          name,
          url,
        },
      });
      console.log(response)
    } catch (error) {
      console.log(error)
      return
    }
  }
}
