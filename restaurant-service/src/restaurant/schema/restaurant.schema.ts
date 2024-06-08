
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RestaurantDocument = HydratedDocument<Restaurant>;



@Schema()
export class Restaurant {
    @Prop()
    name:string;
    @Prop({unique:true})
    email:string;
    @Prop()
    phone_number:string;
    @Prop()
    adress: string;
    @Prop()
    products: string[];

}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);

    
    