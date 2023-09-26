import { Test, TestingModule } from '@nestjs/testing';
import { CustomEmailsController } from './customemails.controller';
import { CustomEmailsService } from './customemails.service';

describe('CustomEmailsController', () => {
  let controller: CustomEmailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomEmailsController],
      providers: [CustomEmailsService]
    }).compile();

    controller = module.get<CustomEmailsController>(CustomEmailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
