import { forwardRef, Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsRepository } from './carts.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartsRepository]),
    forwardRef(() => AuthModule)
  ],
  controllers: [CartsController],
  providers: [CartsService]
})
export class CartsModule {}
