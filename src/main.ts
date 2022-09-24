import { RoleGuard } from './utils/guards/role.guard';
import { JwtAccessGuard } from './utils/guards/jwt-access.guard';
import { APP_SERVER_PORT } from './../settings';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:3000', credentials: true });
  const reflector = new Reflector();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // transform: true,
    }),
  );
  app.use(cookieParser());
  app.useGlobalGuards(new JwtAccessGuard(reflector))
  app.useGlobalGuards(new RoleGuard(reflector));
  await app.listen(APP_SERVER_PORT);
}
bootstrap();
