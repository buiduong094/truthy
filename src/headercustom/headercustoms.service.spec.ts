import { Test, TestingModule } from '@nestjs/testing';
import { HeaderCustomsService } from './headercustoms.service';

describe('HeaderCustomsService', () => {
  let service: HeaderCustomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeaderCustomsService]
    }).compile();

    service = module.get<HeaderCustomsService>(HeaderCustomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
