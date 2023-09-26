import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadCustomsController } from './fileuploadcustoms.controller';
import { FileUploadCustomsService } from './fileuploadcustoms.service';

describe('FileUploadCustomsController', () => {
  let controller: FileUploadCustomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileUploadCustomsController],
      providers: [FileUploadCustomsService]
    }).compile();

    controller = module.get<FileUploadCustomsController>(
      FileUploadCustomsController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
