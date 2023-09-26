import { Test, TestingModule } from '@nestjs/testing';
import { OrderInforsService } from './orderinfors.service';

describe('OrderInforsService', () => {
  let service: OrderInforsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderInforsService]
    }).compile();

    service = module.get<OrderInforsService>(OrderInforsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
