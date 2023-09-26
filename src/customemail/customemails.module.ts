import { forwardRef, Module } from '@nestjs/common';
import { CustomEmailsService } from './customemails.service';
import { CustomEmailsController } from './customemails.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomEmailsRepository } from './customemails.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomEmailsRepository]),
    forwardRef(() => AuthModule)
  ],
  controllers: [CustomEmailsController],
  providers: [CustomEmailsService]
})
export class CustomEmailsModule {}
