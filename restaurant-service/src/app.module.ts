import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guard/role/role.guard';
import {RestaurantModule} from './restaurant/restaurant.module'
import {ProductsModule} from './products/products.module'

 @Module({
  imports: [ 
      ProductsModule, 
      RestaurantModule, 
    
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
  providers: [AppService,
  {provide: APP_GUARD,useClass:RolesGuard}
  ],
})
export class AppModule {}
