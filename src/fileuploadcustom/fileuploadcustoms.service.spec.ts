import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadCustomsService } from './fileuploadcustoms.service';

describe('FileUploadCustomsService', () => {
  let service: FileUploadCustomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileUploadCustomsService]
    }).compile();

    service = module.get<FileUploadCustomsService>(FileUploadCustomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
