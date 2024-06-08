
    import { Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { InjectModel } from "@nestjs/mongoose";
import {Customer} from "./schema/customer.schema";
import { Model } from "mongoose";

@Injectable()
export class CustomerService {

  constructor(@InjectModel(Customer.name) private readonly customerModel: Model<Customer>) { }

  create(createCustomerDto: CreateCustomerDto) {
    
    return this.customerModel.create(createCustomerDto);
  }

  findAll() {
    return this.customerModel.find({});
  }

  findOne(id: string) {
    return this.customerModel.findById(id);
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customerModel.findByIdAndUpdate(id, updateCustomerDto);
  }

  remove(id: string) {
    return this.customerModel.findByIdAndDelete(id);
  }
} 
    