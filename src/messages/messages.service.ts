import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {

    findAll() {
        return 'Estou retornando tudo!'
    }

    findById(id: string) {
        return `Message return, ID: ${id}`
    }

    create(body){
        return `Body recebido ${body}`
    }
}
