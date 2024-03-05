import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, OrderItemDto } from './dtos/create-order.dto';
import { Order, Prisma } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  public async all(where: Prisma.OrderWhereInput = {}): Promise<Order[]> {
    return this.prisma.order.findMany({
      where,
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  public async create(payload: CreateOrderDto): Promise<Order> {
    return this.prisma.order.create({
      data: {
        email: payload.email,
        phone: payload.phone,
        address: payload.address,
        name: payload.name,

        orderItems: {
          createMany: {
            data: payload.orderItems.map((item: OrderItemDto) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
          },
        },
      },
    });
  }
}
