
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose,{ HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

export enum OrderStatus {
  delivered = "Delivered",
  preparing = "Preparing",
  inTransport = "inTransport",
  cancelled = "cancelled",

}
@Schema()
export class Order {
  @Prop()
  user_id: mongoose.Types.ObjectId;
  
  @Prop()
  restaurant_id: mongoose.Types.ObjectId;

  @Prop({enum:OrderStatus,default: OrderStatus.preparing})
  order_status: OrderStatus;

  @Prop()
  foodId: mongoose.Types.ObjectId;
  
  @Prop()
  address:string;
  
  @Prop()
  payment_id: string;

  @Prop()
  restaurant_name:string;

  @Prop()
  username:string;

  @Prop()
  courier_id: mongoose.Types.ObjectId;

  @Prop()
  courier_name:string;

}

export const OrderSchema = SchemaFactory.createForClass(Order);

    
    