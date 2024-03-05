import { Injectable } from '@nestjs/common';
import { Product, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  public async all(where: Prisma.ProductWhereInput = {}): Promise<Product[]> {
    return this.prisma.product.findMany({ where });
  }
}
