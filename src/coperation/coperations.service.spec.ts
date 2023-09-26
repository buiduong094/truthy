import { Test, TestingModule } from '@nestjs/testing';
import { CoperationsService } from './coperations.service';

describe('CoperationsService', () => {
  let service: CoperationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoperationsService]
    }).compile();

    service = module.get<CoperationsService>(CoperationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
