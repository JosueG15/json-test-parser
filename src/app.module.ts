import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { OrdenController } from './order/order.controller';
import { OrdenService } from './order/order.service';
@Module({
  imports: [],
  controllers: [AppController, OrdenController],
  providers: [AppService, OrdenService],
})
export class AppModule {}
