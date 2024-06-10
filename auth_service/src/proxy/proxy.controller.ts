import { Controller, Delete, Get, HttpException, InternalServerErrorException, Patch, Post, Put, Req, Res } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

import { Public } from 'src/reflectors/public.reflector';
import { HttpService } from '@nestjs/axios';
import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from 'axios';
import { catchError, firstValueFrom, Observable } from 'rxjs';


@Controller()
export class ProxyController {


  constructor(
    private authService: AuthService,
    private httpService: HttpService
  ) {
  }


  @Public()
  @Get('*')
  async getAny(@Req() req:Request,){
    return await this.forwardRequest(req);
  }
  @Public()
  @Post('*')
  async postAny(@Req() req:Request) {
    return await this.forwardRequest(req);
  }
  @Public()
  @Patch('*')
  async patchAny(@Req() req:Request) {
    return await this.forwardRequest(req);
  }

  @Public()
  @Put('*')
  async putAny(@Req() req:Request) {
    return await this.forwardRequest(req);
  }

  @Public()
  @Delete('*')
  async deleteAny(@Req() req:Request) {
    return await this.forwardRequest(req);
  }

  private getAuthHeaders(data:any){
    const headers = {};
    if(data == null || data == undefined){
      return headers;
    }
    headers['user-email'] = data.email;
    headers['authorization-level'] = data.authorization_level;
    headers['verified'] = data.is_verified.toString();
    headers['user-id'] = data._id.toString();
    console.log('AUTH DATA');

    console.log(headers);
    return headers;
  }

  private async forwardRequest(request:Request) {
    let req = request;
    let additionalHeaders = {};
    const authData = request.headers['authorization'];
    console.log('AUTHDATA',authData);
    if(authData != null){
      const data =  await this.authService.findAuthenticableData(authData.split(' ')[1]);
      additionalHeaders = this.getAuthHeaders(data);
    }
    
    let target:string;
    // req.headers['host'] = req.url.split('/')[1];

    if(req.url.split('/').length == 1){
      target = 'http://' + req.url + ':3000/';
    }else {

      target = 'http://' + req.url.split('/')[1] + ':3000/' + req.url.split('/').slice(2).join('/');
    }
    const axiosConfig: AxiosRequestConfig = {
      method: req.method as AxiosRequestConfig['method'],
      url: target,
      data: req.body,
      headers: {...this.convertHeaders(req.headers),...additionalHeaders},
    };
    console.log('CONFIGGGG',axiosConfig)
    
  
    // You may need to handle query parameters and other request properties as well

    // this.httpService.request(axiosConfig).subscribe((val) => console.log(val));
    /*
    .pipe(
      catchError(e => {
        throw new HttpException(e.response.data, e.response.status);
      }))
    */
   try {

     const response = await this.getFirstValue(this.httpService.request(axiosConfig));

     return response.data;
   } catch(e) {
     console.log(e);
    if(!e.response) {
      throw new InternalServerErrorException();
    }
    throw new HttpException(e.response.data ?? 'no detail was given', e.response.status ?? '418');
    
   }
  }


  // handleRequest():Promise<AxiosResponse>{

  // }

  private async  getFirstValue<T>(observable:Observable<T>) : Promise<T>  {
    const prom = new Promise<T>((res,rej) => {
      observable.subscribe((val) => {res(val);console.log(val ? val['data'] : 'empty response')},(error) => {
        rej(error)
      })
    });
    const value = await prom;

    return value;
  }
  
  convertHeaders(headers: any): any {
    const convertedHeaders: any = {};
  
    for(let key of Object.keys(headers) ){
      if(key == 'content-length'){
        continue;
      }
      convertedHeaders[key.toLowerCase()] = headers[key];
    }
  
    return convertedHeaders;
  }
  
}
