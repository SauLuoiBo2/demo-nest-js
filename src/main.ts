import { Logger, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { UserInputError } from 'apollo-server-express';
import { AppModule } from './app.module';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(graphqlUploadExpress({ maxFiles: 10 }));

  const logger = new Logger();

  const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;

  logger.log('app started on port ' + port);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new UserInputError('VALIDATION_ERROR', {
          invalidArgs: errors,
        });
      },
    }),
  );
  await app.listen(port);
}
bootstrap();
