import { getTimeAccessToken } from 'src/utils/time/get-time-access-token.fun';
import { User } from '@prisma/client';
import { AuthService } from './../../modules/auth/auth.service';
import { PrismaService } from '@prismaApp/prisma.service';
import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

@Injectable()
export class GoogleAuthService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async googleAuth(idToken: string) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const payload = await client.verifyIdToken({
      idToken,
      audience: clientId,
    });

    const email = payload.getPayload().email;
    const firstName = payload.getPayload().given_name;
    const lastName = payload.getPayload().family_name;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    const data = {
      firstName,
      lastName,
      email,
      isGoogle: true,
    };

    let createdUser: User;
    let userId, role;
    if (!user) {
      createdUser = await this.prisma.user.create({ data });
      userId = createdUser.id;
      role = createdUser.role;
    } else {
      userId = user.id;
      role = user.role;
    }

    const { refreshToken, accessToken } = await this.authService.createTokens(
      userId,
      email,
      role as any,
    );

    await this.authService.updateRefreshToken(userId, refreshToken);
    const expiredAt = getTimeAccessToken('5m');

    const userData = {
      userId,
      email,
      role,
    };
    const result = {
      user: userData,
      refreshToken,
      accessToken,
      expiredAt,
    };

    return result;
  }
}
