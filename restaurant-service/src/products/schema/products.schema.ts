
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductsDocument = HydratedDocument<Products>;


@Schema()
export class Products {
    @Prop()
    restaurant_id: string;
    @Prop()
    name:string;
    @Prop()
    description:string;
    @Prop({default:true})
    available:boolean;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);

    
    