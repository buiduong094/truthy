import { forwardRef, Module } from '@nestjs/common';
import { CoperationsService } from './coperations.service';
import { CoperationsController } from './coperations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoperationsRepository } from './coperations.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CoperationsRepository]),
    forwardRef(() => AuthModule)
  ],
  controllers: [CoperationsController],
  providers: [CoperationsService]
})
export class CoperationsModule {}
