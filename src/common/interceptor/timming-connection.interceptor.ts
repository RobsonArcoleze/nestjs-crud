import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TimmingConnectionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    console.log(`Iniciando: ANTES ${startTime}`);

    return next.handle().pipe(
      tap(() => {
        const finalTIme = Date.now();
        const elapsedTIme = finalTIme - startTime;

        console.log(`Levou ${elapsedTIme}ms para executar.`);
      }),
    );
  }
}
