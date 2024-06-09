import { MoneyDTO } from "./money.dto";
export declare class CreatePaymentDTO {
    id?: number;
    value: number;
    name: string;
    number: string;
    expiration: string;
    code: string;
    status: string;
    orderId: number;
    paymentMode: number;
    money: MoneyDTO;
}
