
import { Controller, Get, Post, Body, Patch, Param, Delete, ForbiddenException, BadRequestException } from '@nestjs/common';
import {RestaurantService} from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RDAService } from 'src/rda/rda.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService,private readonly rdaService:RDAService) {}

  @Post()
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    const result = await this.rdaService.verifyAuthenticationCode(createRestaurantDto.email,createRestaurantDto.verification_code);
    if(!result){
      throw new BadRequestException('Verification code is wrong.');
    }
    const dto = {...createRestaurantDto}
    delete dto.verification_code;
    return this.restaurantService.create(dto);
  }

  @Get()
  findAll() {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantService.update(id, updateRestaurantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantService.remove(id);
  }
}   
    