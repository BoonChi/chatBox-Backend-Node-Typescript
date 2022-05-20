/* eslint-disable */
import 'reflect-metadata';
import { validate } from 'class-validator';

const validationMetadataKey = Symbol('validation');

export function guard(
  target: unknown,
  propertyKey: string | symbol,
  parameterIndex: number,
) {
  let exisitingSchema: number[] =
    Reflect.getOwnMetadata(validationMetadataKey, target, propertyKey) || [];
  exisitingSchema.push(parameterIndex);
  Reflect.defineMetadata(
    validationMetadataKey,
    exisitingSchema,
    target,
    propertyKey,
  );
}

export function validateParam(schema: any) {
  return (
    target: any,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<Function>,
  ) => validateParamWithSchema(schema, target, propertyName, descriptor);
}

function validateParamWithSchema(
  Dto: any,
  target: any,
  propertyName: string,
  descriptor: TypedPropertyDescriptor<Function>,
) {
  let method = descriptor.value!;

  descriptor.value = async function () {
    let schema = Reflect.getOwnMetadata(
      validationMetadataKey,
      target,
      propertyName,
    );
    let dto: any;
    if (schema) {
      dto = new Dto();
      for (let parameterIndex of schema) {
        if (
          parameterIndex >= arguments.length ||
          arguments[parameterIndex] === undefined
        ) {
          throw new Error('Missing arguments.');
        }
        for (const [key, value] of Object.entries(arguments[parameterIndex])) {
          dto[key] = value;
        }
      }
      const result = await validate(dto);
      if (result.length > 0) {
        throw result;
      }
    }
    return method.apply(this, arguments);
  };
}
