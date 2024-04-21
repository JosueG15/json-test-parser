import { Test, TestingModule } from '@nestjs/testing';

import { Orden } from 'src/entities/Orden';
import { OrdenService } from './order.service';

describe('OrderService', () => {
  let service: OrdenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdenService],
    }).compile();

    service = module.get<OrdenService>(OrdenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('crearOrder', () => {
    it('should create a new NuevaOrden object with a random id and return it', () => {
      const mockOrden: Orden = {} as Orden;

      const originalRandom = Math.random;
      Math.random = jest.fn(() => 0.5);

      const nuevaOrden = service.crearOrder(mockOrden);

      Math.random = originalRandom;

      expect(nuevaOrden).toHaveProperty('id');
      expect(nuevaOrden).toHaveProperty('data', mockOrden);

      expect(nuevaOrden.id).toBeCloseTo(0.5);
    });
  });
});
