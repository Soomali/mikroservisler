import { HttpService } from '@nestjs/axios';
import { CreatePaymentDTO } from 'src/order/dto/create-payment.dto';
export declare class RDAService {
    private readonly httpService;
    constructor(httpService: HttpService);
    createPayment(paymentDetails: CreatePaymentDTO): Promise<any>;
    verifyAuthenticationCode(email: string, verification_code: string): Promise<any>;
    private getFirstValue;
}
