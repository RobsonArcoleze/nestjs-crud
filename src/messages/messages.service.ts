import { Injectable, NotFoundException } from '@nestjs/common';
import { MessagesInterface } from 'src/interfaces/messages/messages.interface';

@Injectable()
export class MessagesService {
  private messages: MessagesInterface[] = [];

  findAll(): MessagesInterface[] {
    return this.messages;
  }

  findById(id: number): MessagesInterface {
    const message = this.messages.find((message) => message.id === id);
    if (!message) {
      throw new NotFoundException(`Message with id ${id} not found`);
    }
    return message;
  }

  create(body: Omit<MessagesInterface, 'id'>): MessagesInterface {
    const newMessage: MessagesInterface = {
      id:
        this.messages.length > 0
          ? Math.max(...this.messages.map((message) => message.id)) + 1
          : 1,
      text: body.text,
      name: body.name,
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  update(
    id: number,
    body: Partial<Omit<MessagesInterface, 'id'>>,
  ): MessagesInterface {
    const index = this.messages.findIndex((message) => message.id === id);
    if (index === -1) {
      throw new NotFoundException(`Message with id ${id} not found`);
    }

    this.messages[index] = {
      ...this.messages[index],
      ...body,
    };

    return this.messages[index];
  }

  remove(id: number): void {
    const newMessages = this.messages.filter((message) => message.id !== id);
    this.messages = newMessages;
    console.log('Deletado');
  }
}
