import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';

@Injectable()
export class HashCodeService {
  hashCode(password: string) {
    return argon.hash(password);
  }

  verifyCode(hashedPassword: string, password: string) {
    return argon.verify(hashedPassword, password);
  }
}
