import { Test, TestingModule } from '@nestjs/testing';
import { LabelcustomsService } from './labelcustoms.service';

describe('LabelcustomsService', () => {
  let service: LabelcustomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LabelcustomsService]
    }).compile();

    service = module.get<LabelcustomsService>(LabelcustomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
