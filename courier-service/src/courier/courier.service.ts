
    import { Injectable } from "@nestjs/common";
import { CreateCourierDto } from "./dto/create-courier.dto";
import { UpdateCourierDto } from "./dto/update-courier.dto";
import { InjectModel } from "@nestjs/mongoose";
import {Courier} from "./schema/courier.schema";
import { Model } from "mongoose";

@Injectable()
export class CourierService {

  constructor(@InjectModel(Courier.name) private readonly courierModel: Model<Courier>) { }

  create(createCourierDto: CreateCourierDto) {
    
    return this.courierModel.create(createCourierDto);
  }

  findAll() {
    return this.courierModel.find({});
  }

  findOne(id: string) {
    return this.courierModel.findById(id);
  }

  update(id: string, updateCourierDto: UpdateCourierDto) {
    return this.courierModel.findByIdAndUpdate(id, updateCourierDto);
  }

  remove(id: string) {
    return this.courierModel.findByIdAndDelete(id);
  }
} 
    