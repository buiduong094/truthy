import { forwardRef, Module } from '@nestjs/common';
import { ProductImagesService } from './productimages.service';
import { ProductImagesController } from './productimages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImagesRepository } from './productimages.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductImagesRepository]),
    forwardRef(() => AuthModule)
  ],
  controllers: [ProductImagesController],
  providers: [ProductImagesService]
})
export class ProductImagesModule {}
