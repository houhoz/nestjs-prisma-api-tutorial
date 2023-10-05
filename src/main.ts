import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from "./common/filter/http-exception/http-exception.filter";
import { TransformInterceptor } from "./common/interceptor/transform/transform.interceptor";
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true // 过滤其他不需要的参数
  }))
  await app.listen(3000);
}
bootstrap();
