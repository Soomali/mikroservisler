import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ValidateIfNotNull } from "src/util/validate-if-not-null.decorator";
import { MoneyDTO } from "./money.dto";


export class CreatePaymentDTO {
    @IsNumber()
    @ValidateIfNotNull()
    id?:number;
    @IsNumber()
value:number;
@IsNotEmpty()
name:	string;
@IsNotEmpty()
number:	string;
@IsNotEmpty()
@IsString()
expiration:	string;

@IsString()
code:string;

@IsString()
status:string;

@IsString()
orderId:number;

@IsString()
paymentMode:number;
@Type((_) => MoneyDTO)
money: MoneyDTO;
}


