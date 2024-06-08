import { Module } from '@nestjs/common';

import { ProxyController } from './proxy.controller';
import { EmailMatchStrategy } from 'src/auth/guards/email-match/email-match.strategy';
import { LocalStrategy } from 'src/auth/guards/local/local.strategy';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/guards/jwt/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticableModule } from 'src/authenticable/authenticable.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    EmailMatchStrategy,
  ],
  controllers:[ProxyController],
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    AuthenticableModule,
    PassportModule,
    
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
})
export class ProxyModule {}
