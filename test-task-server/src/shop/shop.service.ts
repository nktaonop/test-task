import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Shop } from '@prisma/client';

@Injectable()
export class ShopService {
  constructor(private readonly prisma: PrismaService) {}

  public async all(): Promise<Shop[]> {
    return this.prisma.shop.findMany();
  }
}
