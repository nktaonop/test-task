import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [PrismaModule, ProductModule, OrderModule, ShopModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
