import 'class-validator';
import { IsMongoId, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ValidateIfNotNull } from 'src/util/validate-if-not-null.decorator';
export class CreateOrderDto {
  @IsMongoId()
  user_id:string;
  @IsMongoId()
  restaurant_id: string;
  @IsMongoId()
  foodId:string;
  @IsNotEmpty()
  @MinLength(12)
  address:string;
  @IsString()
  payment_id:string;
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
    