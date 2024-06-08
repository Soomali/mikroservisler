import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class VerifyCodeBodyDTO {
    @IsString()
    @MinLength(4)
    @MaxLength(4)
    verification_code:string;
    @IsEmail()
    @IsString()
    email:string;
}