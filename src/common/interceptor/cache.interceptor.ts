/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class CacheInteceptor implements NestInterceptor {
  private cache = new Map<string, any>();
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Iniciando antes o CacheInteceptor');
    const request = context.switchToHttp().getRequest();
    const url = request.url;
    const method = request.method;

    if (method !== 'GET') {
      console.log(`Limpando o cache, method chamado: ${method}`);

      this.cache.clear();
      return next.handle();
    }
    if (this.cache.has(url)) {
      console.log('Retornando do cache');
      return of(this.cache.get(url));
    }

    return next.handle().pipe(
      tap(data => {
        this.cache.set(url, data);
        console.log(`Guardando no cache, url:${url}`);
      }),
    );
  }
}
