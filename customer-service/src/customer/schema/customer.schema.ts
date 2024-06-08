
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<Customer>;


@Schema()
export class Customer {
    @Prop()
    name:string;
    @Prop()
    surname:string;
    @Prop({unique:true})
    email:string;
    @Prop()
    phone_number:string;
    @Prop()
    adress: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

    
    