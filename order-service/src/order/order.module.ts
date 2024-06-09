
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { Order, OrderSchema } from "./schema/order.schema";
import { HttpModule } from "@nestjs/axios";
import { RDAService } from "src/rda/rda.service";

@Module({
  controllers: [OrderController],
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])
  ],
  providers: [OrderService,RDAService],
})
export class OrderModule { }
    
    