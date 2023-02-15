import { RoleE } from 'src/modules/auth/role/roles.enum';
export interface CreateTokenI {
  accessToken: string;
}
export interface CreateTokensI extends CreateTokenI{
  refreshToken: string;
}

export interface JwtPayloadI {
  userId: number;
  email: string;
  role: RoleE;
}

export interface JwtPayloadWithRefreshTokenI extends JwtPayloadI {
  refreshToken: string;
}
