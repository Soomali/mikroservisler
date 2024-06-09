import { Type } from 'class-transformer';
import 'class-validator';
import { IsMongoId, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ValidateIfNotNull } from 'src/util/validate-if-not-null.decorator';
import { CreatePaymentDTO } from './create-payment.dto';
export class CreateOrderDto {
  @IsMongoId()
  customer_id:string;
  @IsMongoId()
  restaurant_id: string;
  @IsMongoId()
  foodId:string;
  @IsNotEmpty()
  @MinLength(12)
  address:string;
  @Type((_) => CreatePaymentDTO)
  paymentDetails: CreatePaymentDTO;
  @IsString()
  @IsNotEmpty()
  restaurant_name:string;
  @IsString()
  username:string;
  @IsMongoId()
  @ValidateIfNotNull()
  courier_id:string;
  @IsString()
  @ValidateIfNotNull()
  courier_name:string;
}
    