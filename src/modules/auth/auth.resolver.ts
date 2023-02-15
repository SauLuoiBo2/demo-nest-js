import { GoogleAuthService } from './../../configs/google-auth/google-auth.service';
import { UpdateUserInput } from './../user/dto/update-user.input';
import { ForgotInput } from './dto/forgot.input';
import { ChangePasswordInput } from './dto/change-password.input';
import { NewTokensResponse } from './dto/new-tokens.response';
import { LogoutResponse } from './dto/logout.response';
import { SignResponse } from './dto/sign-response';
import { User } from 'src/modules/user/entities/user.entity';
import { SigninInput } from './dto/signin.input';
import { Resolver, Mutation, Args, Int, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Public } from './role/public.decorator';
import { CurrentUserId } from './decorator/current-user-id.decorator';
import { CurrentUser } from './decorator/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { RefreshTokenGuard } from './guard/refresh-token.guard';

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private googleAuthService: GoogleAuthService,
  ) {}

  // Test func
  @Mutation(() => Boolean)
  @Public()
  async verifyEmail(@Args('token') token: string) {
    return await this.authService.verifyEmail(token);
  }

  @Mutation(() => SignResponse)
  @Public()
  signinAuth(@Args('SigninAuth') signinInput: SigninInput) {
    return this.authService.login(signinInput);
  }

  @Mutation(() => SignResponse)
  @Public()
  async signinGoogle(_, @Args('idToken') idToken: string) {
    return await this.googleAuthService.googleAuth(idToken);
  }

  @Query(() => NewTokensResponse)
  @UseGuards(RefreshTokenGuard)
  @Public()
  getNewTokens(
    @CurrentUserId() userId: number,
    @CurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.getNewTokens(userId, refreshToken);
  }

  @Mutation(() => LogoutResponse)
  @Public()
  logout(@Args('id', { type: () => Int }) userId: number) {
    return this.authService.logout(userId);
  }

  @Mutation(() => String)
  @Public()
  sendMailForgot(@Args('forgotInput') forgotInput: ForgotInput) {
    this.authService.forgot(forgotInput);
    return 'ok';
  }

  @Mutation(() => String)
  @Public()
  changePass(
    @Args('changePasswordInput') changePasswordInput: ChangePasswordInput,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    this.authService.changePassword(changePasswordInput, updateUserInput);
    return 'ok';
  }
}
