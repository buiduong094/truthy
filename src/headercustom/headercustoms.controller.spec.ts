import { Test, TestingModule } from '@nestjs/testing';
import { HeaderCustomsController } from './headercustoms.controller';
import { HeaderCustomsService } from './headercustoms.service';

describe('HeaderCustomsController', () => {
  let controller: HeaderCustomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeaderCustomsController],
      providers: [HeaderCustomsService]
    }).compile();

    controller = module.get<HeaderCustomsController>(HeaderCustomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
