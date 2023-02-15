import { JwtPayloadI } from '../types';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(public config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('ACCESS_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: JwtPayloadI) {
    return payload;
  }
}
