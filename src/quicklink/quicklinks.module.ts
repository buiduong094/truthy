import { forwardRef, Module } from '@nestjs/common';
import { QuickLinksService } from './quicklinks.service';
import { QuickLinksController } from './quicklinks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuickLinksRepository } from './quicklinks.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuickLinksRepository]),
    forwardRef(() => AuthModule)
  ],
  controllers: [QuickLinksController],
  providers: [QuickLinksService]
})
export class QuickLinksModule {}
