import { Test, TestingModule } from '@nestjs/testing';
import { CartInforsController } from './cartinfors.controller';
import { CartInforsService } from './cartinfors.service';

describe('CartInforsController', () => {
  let controller: CartInforsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartInforsController],
      providers: [CartInforsService]
    }).compile();

    controller = module.get<CartInforsController>(CartInforsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
