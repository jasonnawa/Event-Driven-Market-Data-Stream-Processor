import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController} from './user.controller';
import { User2, User2Schema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
   imports: [MongooseModule.forFeature([{ name: User2.name, schema: User2Schema }])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
