import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ParseIntAndValidationIdPipePipe } from './common/pipe/parse-int-and-validation-id-pipe.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //REMOVE CHAVES QUE NÃO ESTÃO NO DTO
      forbidNonWhitelisted: true, //LEVANTAR ERRO QUANDO A CHAVE NÃO EXISTIR
    }),
    new ParseIntAndValidationIdPipePipe(),
  );
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
