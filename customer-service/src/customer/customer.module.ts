
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { Customer, CustomerSchema } from "./schema/customer.schema";
import { RDAService } from "src/rda/rda.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  controllers: [CustomerController],
  imports: [
    HttpModule,
    
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }])
  ],
  providers: [CustomerService,RDAService],
})
export class CustomerModule { }
    
    