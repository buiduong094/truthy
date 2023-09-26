import { forwardRef, Module } from '@nestjs/common';
import { OrderInforsService } from './orderinfors.service';
import { OrderInforsController } from './orderinfors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderInforsRepository } from './orderinfors.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderInforsRepository]),
    forwardRef(() => AuthModule)
  ],
  controllers: [OrderInforsController],
  providers: [OrderInforsService]
})
export class OrderInforsModule {}
