import { IsNumber, IsString } from "class-validator";

export class MoneyDTO {
    @IsNumber()
    id:number;
    @IsString()
    unit:string;
    @IsNumber()
    value:number;

}