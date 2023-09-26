import { Test, TestingModule } from '@nestjs/testing';
import { CoperationsController } from './coperations.controller';
import { CoperationsService } from './coperations.service';

describe('CoperationsController', () => {
  let controller: CoperationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoperationsController],
      providers: [CoperationsService]
    }).compile();

    controller = module.get<CoperationsController>(CoperationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
