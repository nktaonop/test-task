import { Controller, Get } from '@nestjs/common';
import { Shop } from '@prisma/client';
import { ShopService } from './shop.service';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  public async all(): Promise<Shop[]> {
    return this.shopService.all();
  }
}
