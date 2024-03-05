import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  public async all(@Query('shopId') shopId?: string): Promise<Product[]> {
    return this.productService.all({
      shop: {
        id: shopId,
      },
    });
  }
}
