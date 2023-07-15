import { forwardRef, Module } from '@nestjs/common';
import { LabelcustomsService } from './labelcustoms.service';
import { LabelcustomsController } from './labelcustoms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabelcustomsRepository } from './labelcustoms.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LabelcustomsRepository]),
    forwardRef(() => AuthModule)
  ],
  controllers: [LabelcustomsController],
  providers: [LabelcustomsService]
})
export class LabelcustomsModule {}
