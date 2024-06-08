
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CourierDocument = HydratedDocument<Courier>;


@Schema()
export class Courier {
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

export const CourierSchema = SchemaFactory.createForClass(Courier);

    
    