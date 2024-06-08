
import { Controller, Get, Post, Body, Patch, Param, Delete, ForbiddenException, BadRequestException } from '@nestjs/common';
import {CustomerService} from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { RDAService } from 'src/rda/rda.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService,private readonly rdaService:RDAService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const result = await this.rdaService.verifyAuthenticationCode(createCustomerDto.email,createCustomerDto.verification_code);
    if(!result){
      throw new BadRequestException('Verification code is wrong.');
    }
    const dto = {...createCustomerDto}
    delete dto.verification_code;
    return this.customerService.create(dto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }
}   
    