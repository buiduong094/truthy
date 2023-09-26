import { Test, TestingModule } from '@nestjs/testing';
import { CustomEmailsService } from './customemails.service';

describe('CustomEmailsService', () => {
  let service: CustomEmailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomEmailsService]
    }).compile();

    service = module.get<CustomEmailsService>(CustomEmailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
