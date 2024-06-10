import {
  Controller,
  Post,
  UseGuards,
  Body,
  HttpStatus,
  BadRequestException,
  ForbiddenException,
  HttpCode,
  Get,
  Req,
  Res,
  Patch,
  Delete,
} from '@nestjs/common';
import { Public } from 'src/reflectors/public.reflector';
import { LocalAuthGuard } from './guards/local/local-auth.guard';
import { AuthService } from './auth.service';
import { CreateAuthenticableDTO } from 'src/authenticable/dto/create-authenticable.dto';
import { RefreshPasswordDTO } from './dto/refresh-password.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';
import { AccessTokenResponse } from './response/access-token.response';
import { AccessTokenWithIdResponse } from './response/access-token-with-id.response';
import { RefreshTokenDTO } from './dto/refresh-token.dto';
import { RefreshPasswordRequestDTO } from './dto/refresh-password-request.dto';
import { AuthorizationLevel } from 'src/authenticable/schema/authenticable.schema';
import { StartRefreshPasswordDTO } from './dto/start-refresh-password.dto';
import { LoginResponse } from './response/login.response';
import { VerifyCodeBodyDTO } from './dto/verify-code-body.dto';


@Controller('auth')
export class AuthController {


  constructor(
    private authService: AuthService,
  ) {}

  @ApiResponse({
    description: 'Giriş Başarılı',
    status: HttpStatus.OK,
    type: LoginResponse,
  })
  @ApiResponse({
    description: 'Giriş Başarısız',
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestException,
  })
  @ApiOperation({
    description: 'Hesaba Giriş Yapmak için kullanılır',
    responses: {
      default: { description: 'returns the access token for the account' },
    },
  })
  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: LoginDTO) {
    const loginResponse = await this.authService.login(body);
    return loginResponse;
  }

  @ApiResponse({
    description: 'Hesap Oluşturma Başarılı',
    status: HttpStatus.OK,
    type: AccessTokenWithIdResponse,
  })
  @ApiResponse({
    description: 'email veya şifre uygun formatta değil',
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestException,
  })
  @ApiOperation({
    description: 'Hesap oluşturmak için kullanılır',
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() createAuthenticableDTO: CreateAuthenticableDTO) {
    return this.authService.register(createAuthenticableDTO);
  }

  @ApiResponse({
    description: 'Token Yenileme Başarılı',
    status: HttpStatus.OK,
    type: AccessTokenResponse,
  })
  @ApiResponse({
    description: 'Token yenileme başarısız',
    status: HttpStatus.UNAUTHORIZED,
    type: BadRequestException,
  })
  @ApiOperation({
    description:
      'Süresi dolmak üzere olan tokenlerinizi yenilemek için kullanılır. Süresi dolan tokenler yenilenmez.',
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  async refreshToken(@Body() body: RefreshTokenDTO) {
    return this.authService.refreshToken(body.refresh_token);
  }

  @ApiResponse({
    description: 'Şifre yenileme için telefona kod yollandı',
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    description: 'Email bulunamadı / Email geçersiz',
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestException,
  })
  @ApiOperation({
    description:
      'Şifre yenileme isteği için kullanılır. Telefona kod gönderilmesine sebep olur.',
  })
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('request-password-refresh')
  async requestPasswordRefresh(@Body() body: RefreshPasswordRequestDTO) {
    return this.authService.requestRefreshPassword(body.email);
  }


  @Post('verify-code')
  async verifyCode(@Body() body: VerifyCodeBodyDTO) {
    return this.authService.verify(body.email,body.verification_code);
  }

  @ApiResponse({
    description: 'Şifre yenileme başarılı',
    status: HttpStatus.OK,
    type: AccessTokenResponse,
  })
  @ApiResponse({
    description: 'Email bulunamadı / Email geçersiz',
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestException,
  })
  @ApiResponse({
    description: 'Kod Geçersiz',
    status: HttpStatus.FORBIDDEN,
    type: ForbiddenException,
  })
  @ApiOperation({
    description: 'Şifre yenileme isteğini başlatmak için kullanılır.',
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh-password-start')
  async startRefreshPassword(@Body() body: StartRefreshPasswordDTO) {
    return this.authService.startRefreshPassword(
      body.email,
      body.verification_code,
    );
  }

  @ApiResponse({
    description: 'Şifre yenileme başarılı',
    status: HttpStatus.OK,
    type: LoginResponse,
  })
  @ApiResponse({
    description: 'formatlarda hata var',
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestException,
  })
  @ApiResponse({
    description: 'JWT token geçersiz',
    status: HttpStatus.FORBIDDEN,
    type: ForbiddenException,
  })
  @ApiOperation({
    description: 'Şifre yenileme isteğini başlatmak için kullanılır.',
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh-password-confirm')
  async refreshPasswordConfirm(@Body() body: RefreshPasswordDTO) {
    return true;
  }

}
