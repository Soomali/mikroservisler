
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RestaurantController } from "./restaurant.controller";
import { RestaurantService } from "./restaurant.service";
import { Restaurant, RestaurantSchema } from "./schema/restaurant.schema";
import { RDAService } from "src/rda/rda.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  controllers: [RestaurantController],
  imports: [
    HttpModule,
    
    MongooseModule.forFeature([{ name: Restaurant.name, schema: RestaurantSchema }])
  ],
  providers: [RestaurantService,RDAService],
})
export class RestaurantModule { }
    
    