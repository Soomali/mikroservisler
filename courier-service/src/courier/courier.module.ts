
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CourierController } from "./courier.controller";
import { CourierService } from "./courier.service";
import { Courier, CourierSchema } from "./schema/courier.schema";
import { RDAService } from "src/rda/rda.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  controllers: [CourierController],
  imports: [
    HttpModule,
    
    MongooseModule.forFeature([{ name: Courier.name, schema: CourierSchema }])
  ],
  providers: [CourierService,RDAService],
})
export class CourierModule { }
    
    