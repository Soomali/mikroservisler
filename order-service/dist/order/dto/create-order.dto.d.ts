import 'class-validator';
import { CreatePaymentDTO } from './create-payment.dto';
export declare class CreateOrderDto {
    customer_id: string;
    restaurant_id: string;
    foodId: string;
    address: string;
    paymentDetails: CreatePaymentDTO;
    restaurant_name: string;
    username: string;
    courier_id: string;
    courier_name: string;
}
