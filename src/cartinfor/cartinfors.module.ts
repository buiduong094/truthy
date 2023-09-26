import { forwardRef, Module } from '@nestjs/common';
import { CartInforsService } from './cartinfors.service';
import { CartInforsController } from './cartinfors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartInforsRepository } from './cartinfors.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartInforsRepository]),
    forwardRef(() => AuthModule)
  ],
  controllers: [CartInforsController],
  providers: [CartInforsService]
})
export class CartInforsModule {}
