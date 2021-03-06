import { Module } from '@nestjs/common';
import { UserController } from '../presentation/controller/user/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
