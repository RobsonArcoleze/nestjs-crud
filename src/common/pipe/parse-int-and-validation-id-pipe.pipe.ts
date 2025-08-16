/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntAndValidationIdPipePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.data !== 'id') {
      return value;
    }

    const parsedValue = Number(value);

    if (isNaN(parsedValue))
      throw new BadRequestException(`Id ${value} is not a number!`);

    if (!Number.isInteger(parsedValue))
      throw new BadRequestException(`Id ${value} is not a number integer!`);

    return value;
  }
}
