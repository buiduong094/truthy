import { Test, TestingModule } from '@nestjs/testing';
import { QuickLinksController } from './quicklinks.controller';
import { QuickLinksService } from './quicklinks.service';

describe('QuickLinksController', () => {
  let controller: QuickLinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuickLinksController],
      providers: [QuickLinksService]
    }).compile();

    controller = module.get<QuickLinksController>(QuickLinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
