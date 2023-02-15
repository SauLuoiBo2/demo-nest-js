import { ErrorsCodeApp } from '@common/exceptions/errors-code.enum';
import { HttpStatus } from '@nestjs/common';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

export const formatError = (error: GraphQLError) => {
  console.log(error);
  if (error.message === ErrorsCodeApp.VALIDATION_ERROR) {
    const extensions = {
      code: HttpStatus.BAD_REQUEST,
      error: [],
    };

    Object.keys(error.extensions.invalidArgs).forEach((key) => {
      const constraints = [];
      Object.keys(error.extensions.invalidArgs[key].constraints).forEach(
        (_key) => {
          constraints.push(error.extensions.invalidArgs[key].constraints[_key]);
        },
      );

      extensions.error.push({
        field: error.extensions.invalidArgs[key].property,
        errors: constraints,
      });
    });

    const graphQLFormattedError: GraphQLFormattedError = {
      message: 'VALIDATION_ERROR',
      path: error.path,
      extensions,
    };

    return graphQLFormattedError;
  } else {
    // many request

    // if (error.extensions.code === 429) {
    //   return {
    //     message: error.message,
    //     path: error.path,
    //     extensions: {
    //       code: HttpStatus.TOO_MANY_REQUESTS,
    //       error: error.message,
    //     },
    //   };
    // }

    // input

    const isValidInputError =
      error.extensions.code === 'BAD_USER_INPUT' ||
      error.extensions.code === 'GRAPHQL_VALIDATION_FAILED';

    if (isValidInputError) {
      return {
        message: error.extensions.code.toString(),
        path: error.path,
        extensions: {
          code: HttpStatus.BAD_REQUEST,
          error: error.extensions.code,
        },
      };
    }

    const isInternalServerError =
      error.extensions.code === 'INTERNAL_SERVER_ERROR';
    if (isInternalServerError) {
      return {
        message: error.extensions.code.toString(),
        path: error.path,
        extensions: {
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'INTERNAL_SERVER_ERROR',
        },
      };
    }

    return {
      message: error.message,
      path: error.path,
      extensions: {
        code: error.extensions.code,
        error: error.message,
      },
    };
  }
};
