import { Module } from '@nestjs/common';
import { ShopsController } from './shop.controller';
import { ShopService } from './shop.service';

@Module({
  controllers: [ShopsController],
  providers: [ShopService],
})
export class ShopModule {}
