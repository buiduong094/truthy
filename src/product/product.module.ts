import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductService } from 'src/product/product.service';
import { ProductController } from 'src/product/product.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UniqueValidatorPipe } from 'src/common/pipes/unique-validator.pipe';
import { ProductRepository } from 'src/product/product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRepository]),
    forwardRef(() => AuthModule)
  ],
  exports: [ProductService],
  controllers: [ProductController],
  providers: [ProductService, UniqueValidatorPipe]
})
export class ProductModule {}
