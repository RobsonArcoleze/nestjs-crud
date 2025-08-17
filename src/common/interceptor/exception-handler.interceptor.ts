/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ExceptionHandlerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(erro => {
        console.log(`Posso capturar qualquer erro, ERROR: ${erro}`);

        return throwError(() => {
          if (erro.name === 'NotFoundException')
            return new BadRequestException(`Enviando outro erro`);

          return erro;
        });
      }),
    );
  }
}
