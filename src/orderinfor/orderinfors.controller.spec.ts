import { Test, TestingModule } from '@nestjs/testing';
import { OrderInforsController } from './orderinfors.controller';
import { OrderInforsService } from './orderinfors.service';

describe('OrderInforsController', () => {
  let controller: OrderInforsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderInforsController],
      providers: [OrderInforsService]
    }).compile();

    controller = module.get<OrderInforsController>(OrderInforsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
