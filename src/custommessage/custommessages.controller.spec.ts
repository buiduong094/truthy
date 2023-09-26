import { Test, TestingModule } from '@nestjs/testing';
import { CustomMessagesController } from './custommessages.controller';
import { CustomMessagesService } from './custommessages.service';

describe('CustomMessagesController', () => {
  let controller: CustomMessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomMessagesController],
      providers: [CustomMessagesService]
    }).compile();

    controller = module.get<CustomMessagesController>(CustomMessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
