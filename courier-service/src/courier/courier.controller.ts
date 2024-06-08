
import { Controller, Get, Post, Body, Patch, Param, Delete, ForbiddenException, BadRequestException } from '@nestjs/common';
import {CourierService} from './courier.service';
import { CreateCourierDto } from './dto/create-courier.dto';
import { UpdateCourierDto } from './dto/update-courier.dto';
import { RDAService } from 'src/rda/rda.service';

@Controller('courier')
export class CourierController {
  constructor(private readonly courierService: CourierService,private readonly rdaService:RDAService) {}

  @Post()
  async create(@Body() createCourierDto: CreateCourierDto) {
    const result = await this.rdaService.verifyAuthenticationCode(createCourierDto.email,createCourierDto.verification_code);
    if(!result){
      throw new BadRequestException('Verification code is wrong.');
    }
    const dto = {...createCourierDto}
    delete dto.verification_code;
    return this.courierService.create(dto);
  }

  @Get()
  findAll() {
    return this.courierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courierService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourierDto: UpdateCourierDto) {
    return this.courierService.update(id, updateCourierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courierService.remove(id);
  }
}   
    