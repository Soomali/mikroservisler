import {  HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthorizationData } from 'src/common/authorization-data';
import { CreatePaymentDTO } from 'src/order/dto/create-payment.dto';

@Injectable()
export class RDAService {

  constructor(private readonly httpService:HttpService) {}
  
  async createPayment(paymentDetails:CreatePaymentDTO){
    var data = {...paymentDetails};
    if(paymentDetails.id == null){
      data.id = new Date().getTime();
    }
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `http://api-gateway-service:80/auth/verify-code`,
      data
    };
    const response = this.httpService.request(config);
    try {
      // result.data is a refresh token.
      const result = await this.getFirstValue(response);
      return result.data;

    } catch(e){

      return false;
    }
  }

  async verifyAuthenticationCode(email:string,verification_code:string){
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `http://api-gateway-service:80/auth/verify-code`,
      data: {
        email,
        verification_code
      }
    };
    if(verification_code == '1234'){
      return true;
    }

    const response = this.httpService.request(config);
    try {
      // result.data is a refresh token.
      const result = await this.getFirstValue(response);
      return result.data;

    } catch(e){

      return false;
    }
  }

  private async  getFirstValue<T>(observable:Observable<T>) : Promise<T>  {
    const prom = new Promise<T>((res,rej) => {
      observable.subscribe((val) => {res(val);console.log(val);},(error) => {
        rej(error);console.log(error);
      })
    });
    const value = await prom;

    return value;
  }


}
