import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    //Esse cara está na camada do servidor, ele atua antes de chegar na controller
    return res.status(404).send({
      message: 'Não encontrei',
    });

    // next(); // vai para outro middleware
  }
}
