import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthenticableModule } from './authenticable/authenticable.module';
import { ConfigModule } from '@nestjs/config';
import { ProxyModule } from './proxy/proxy.module';


@Module({
  imports: [AuthModule,AuthenticableModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.docker.env'],
      cache: false,
      load: [],
    }),
    ProxyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
