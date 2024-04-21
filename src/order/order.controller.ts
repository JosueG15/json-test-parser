import { Controller, Post, Body, Res } from '@nestjs/common';
import { OrdenService } from './order.service';
import { Orden } from 'src/entities/Orden';
import { Response } from 'express';

@Controller('orden')
export class OrdenController {
  constructor(private readonly ordenService: OrdenService) {}

  @Post()
  crearOrden(@Body() orden: Orden, @Res() res: Response) {
    const nuevaOrden = this.ordenService.crearOrder(orden);
    console.log(orden);

    res
      .status(200)
      .send({ message: 'Operación realizada correctamente.', nuevaOrden });
  }
}
