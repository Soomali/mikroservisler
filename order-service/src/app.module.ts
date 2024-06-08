import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {OrderModule} from './order/order.module'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

 @Module({
  imports: [ 
      OrderModule,
      ConfigModule.forRoot(),

      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => {
          const uri = configService.get<string>('MONGODB_URL');
          console.log(uri);
          return {
            uri,
          };
        },
        inject: [ConfigService],
      }),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
