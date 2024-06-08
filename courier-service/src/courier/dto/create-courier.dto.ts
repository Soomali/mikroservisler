import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCourierDto {
    @IsNotEmpty()
    @IsString()
    name:string;
    @IsNotEmpty()
    @IsString()
    surname:string;
    @IsEmail()
    @IsNotEmpty()
    email:string;
    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber()
    phone_number:string;
    @IsNotEmpty()
    @IsString()
    adress: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(4)
    verification_code:string;
}
    