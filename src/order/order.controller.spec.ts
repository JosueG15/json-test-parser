import { Test, TestingModule } from '@nestjs/testing';

import { Orden } from 'src/entities/Orden';
import { OrdenController } from './order.controller';
import { OrdenService } from './order.service';
import { Response } from 'express';

describe('OrdenController', () => {
  let controller: OrdenController;
  let service: OrdenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdenController],
      providers: [OrdenService],
    }).compile();

    controller = module.get<OrdenController>(OrdenController);
    service = module.get<OrdenService>(OrdenService);
  });

  it('debe estar definida', () => {
    expect(controller).toBeDefined();
  });

  it('debe retornar una nueva orden cuando se llama', async () => {
    const mockOrden = {} as Orden;
    const mockNuevaOrden = { id: 1234, data: { ...mockOrden } };
    jest
      .spyOn(service, 'crearOrder')
      .mockImplementationOnce(() => mockNuevaOrden);

    expect(controller.crearOrden(mockOrden, {} as Response)).toEqual(
      mockNuevaOrden,
    );
  });
});
