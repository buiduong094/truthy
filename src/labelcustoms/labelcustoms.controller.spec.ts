import { Test, TestingModule } from '@nestjs/testing';
import { LabelcustomsController } from './labelcustoms.controller';
import { LabelcustomsService } from './labelcustoms.service';

describe('LabelcustomsController', () => {
  let controller: LabelcustomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LabelcustomsController],
      providers: [LabelcustomsService]
    }).compile();

    controller = module.get<LabelcustomsController>(LabelcustomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
