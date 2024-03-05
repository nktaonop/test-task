import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { Order } from '@prisma/client';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  public async create(@Body() payload: CreateOrderDto): Promise<Order> {
    if (!payload.orderItems || !payload.orderItems.length) {
      throw new HttpException(
        'Products should not be empty',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.orderService.create(payload);
  }

  @Get()
  public async all(@Query('email') email?: string): Promise<Order[]> {
    return this.orderService.all({
      email: {
        equals: email,
      },
    });
  }
}
