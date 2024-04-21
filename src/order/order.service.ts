import { Injectable } from '@nestjs/common';
import { NuevaOrden } from 'src/entities/NuevaOrden';
import { Orden } from 'src/entities/Orden';

@Injectable()
export class OrdenService {
  crearOrder(orden: Orden): NuevaOrden {
    const nuevaOrden: NuevaOrden = {
      id: Math.random(),
      data: orden,
    };

    console.table(nuevaOrden);

    return nuevaOrden;
  }
}
