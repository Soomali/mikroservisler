import { IsBoolean } from "class-validator";

export class UpdateProductAvailabilityDTO {
    @IsBoolean()
    available:boolean;
}