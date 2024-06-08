import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type AuthenticableDocument = HydratedDocument<Authenticable>;

export enum AuthorizationLevel {

  admin = 'admin',
  customer = 'customer',
  courier = "courier",
  restaurant = "restaurant"
}

@Schema()
export class Authenticable {
  @Prop({
    required: true,
    unique: true,
  })
  email: string;
  @Prop({
    required: true,
  })
  password: string;
  @Prop({ required: true, unique: true })
  phone_number: string;
  @Prop({
    default: [],
  })
  refresh_tokens: string[];
  @Prop({
    default: '1234',
  })
  verification_code: string;
  @Prop({
    default: false,
  })
  is_verified: boolean;
  @Prop({
    default: AuthorizationLevel.customer,
  })
  authorization_level: AuthorizationLevel;
  @Prop({})
  password_refresh_token: string;
}

export const AuthenticableSchema = SchemaFactory.createForClass(Authenticable);
