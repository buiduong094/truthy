import { Test, TestingModule } from '@nestjs/testing';
import { CartInforsService } from './cartinfors.service';

describe('CartInforsService', () => {
  let service: CartInforsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartInforsService]
    }).compile();

    service = module.get<CartInforsService>(CartInforsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
