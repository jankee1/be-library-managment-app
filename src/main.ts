import { JwtAccessGuard } from './utils/guards/jwt-access.guard';
import { APP_SERVER_PORT } from './../settings';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = new Reflector();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // transform: true,
    }),
  );
  app.useGlobalGuards(new JwtAccessGuard(reflector))
  await app.listen(APP_SERVER_PORT);
}
bootstrap();
