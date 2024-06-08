
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import {OrderService} from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthorizationLevel, Roles } from 'src/decorators/roles.decorator';
import { OrderStatus } from './schema/order.schema';
import { SetOrderStatusDTO } from './dto/set-order-status.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Roles(AuthorizationLevel.customer,AuthorizationLevel.admin)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }
  @Roles(AuthorizationLevel.restaurant,AuthorizationLevel.admin)
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Roles(AuthorizationLevel.restaurant,AuthorizationLevel.admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Roles(AuthorizationLevel.admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }
  @Roles(AuthorizationLevel.admin,AuthorizationLevel.courier,AuthorizationLevel.restaurant)
  @Patch('deliver/:id')
  setDelivered(@Param('id') id:string,@Body() body:SetOrderStatusDTO) {
    return this.orderService.updateOrderStatus(id,body.status);
  }
  @Roles(AuthorizationLevel.admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}   
    