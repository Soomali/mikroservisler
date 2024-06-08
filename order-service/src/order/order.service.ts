
    import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { InjectModel } from "@nestjs/mongoose";
import {Order, OrderStatus} from "./schema/order.schema";
import { Model } from "mongoose";

@Injectable()
export class OrderService {

  constructor(@InjectModel(Order.name) private readonly orderModel: Model<Order>) { }

  create(createOrderDto: CreateOrderDto) {
    return this.orderModel.create(createOrderDto);
  }

  findAll() {
    return this.orderModel.find({});
  }

  findOne(id: string) {
    return this.orderModel.findById(id);
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderModel.findByIdAndUpdate(id, updateOrderDto);
  }

  updateOrderStatus(id:string,order_status:OrderStatus){
    return this.orderModel.findByIdAndUpdate(id,{
      order_status
    });
  }

  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }
} 
    