import { forwardRef, Module } from '@nestjs/common';
import { CustomMessagesService } from './custommessages.service';
import { CustomMessagesController } from './custommessages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomMessagesRepository } from './custommessages.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomMessagesRepository]),
    forwardRef(() => AuthModule)
  ],
  controllers: [CustomMessagesController],
  providers: [CustomMessagesService]
})
export class CustomMessagesModule {}
