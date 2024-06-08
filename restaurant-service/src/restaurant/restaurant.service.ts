
    import { Injectable } from "@nestjs/common";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";
import { InjectModel } from "@nestjs/mongoose";
import {Restaurant} from "./schema/restaurant.schema";
import { Model } from "mongoose";

@Injectable()
export class RestaurantService {

  constructor(@InjectModel(Restaurant.name) private readonly restaurantModel: Model<Restaurant>) { }

  create(createRestaurantDto: CreateRestaurantDto) {
    
    return this.restaurantModel.create(createRestaurantDto);
  }

  findAll() {
    return this.restaurantModel.find({});
  }

  findOne(id: string) {
    return this.restaurantModel.findById(id);
  }

  update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantModel.findByIdAndUpdate(id, updateRestaurantDto);
  }

  remove(id: string) {
    return this.restaurantModel.findByIdAndDelete(id);
  }
} 
    