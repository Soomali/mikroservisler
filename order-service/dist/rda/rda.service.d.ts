import { HttpService } from '@nestjs/axios';
export declare class RDAService {
    private readonly httpService;
    constructor(httpService: HttpService);
    verifyAuthenticationCode(email: string, verification_code: string): Promise<any>;
    private getFirstValue;
}
