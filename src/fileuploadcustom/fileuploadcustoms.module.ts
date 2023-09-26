import { forwardRef, Module } from '@nestjs/common';
import { FileUploadCustomsService } from './fileuploadcustoms.service';
import { FileUploadCustomsController } from './fileuploadcustoms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadCustomsRepository } from './fileuploadcustoms.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileUploadCustomsRepository]),
    forwardRef(() => AuthModule)
  ],
  controllers: [FileUploadCustomsController],
  providers: [FileUploadCustomsService]
})
export class FileUploadCustomsModule {}
