import { NestFactory } from '@nestjs/core';
import { AppModule } from './nest-module/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
}
bootstrap();
