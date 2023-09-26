import { forwardRef, Module } from '@nestjs/common';
import { HeaderCustomsService } from './headercustoms.service';
import { HeaderCustomsController } from './headercustoms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeaderCustomsRepository } from './headercustoms.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([HeaderCustomsRepository]),
    forwardRef(() => AuthModule)
  ],
  controllers: [HeaderCustomsController],
  providers: [HeaderCustomsService]
})
export class HeaderCustomsModule {}
