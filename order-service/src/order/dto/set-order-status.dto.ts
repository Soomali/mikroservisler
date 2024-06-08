import { IsEnum, IsNotEmpty } from "class-validator";
import { OrderStatus } from "../schema/order.schema";

export class SetOrderStatusDTO {
    @IsEnum(OrderStatus)
    @IsNotEmpty()
    status:OrderStatus;
}