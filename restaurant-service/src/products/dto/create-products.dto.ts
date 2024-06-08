import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { ValidateIfNotNull } from "src/util/validate-if-not-null.decorator";

export class CreateProductsDto {
    @IsMongoId()
    restaurant_id: string;
    @IsString()
    @IsNotEmpty()
    name:string;
    @IsString()
    @IsNotEmpty()
    @ValidateIfNotNull()
    description:string;

}
    