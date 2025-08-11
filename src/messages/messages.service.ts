import { Injectable, NotFoundException } from '@nestjs/common';
import { MessagesDto } from './dto/messages.dto';

@Injectable()
export class MessagesService {
  private messages: MessagesDto[] = [];

  findAll(): MessagesDto[] {
    return this.messages;
  }

  findById(id: number): MessagesDto {
    const message = this.messages.find((message) => message.id === id);
    if (!message) {
      throw new NotFoundException(`Message with id ${id} not found`);
    }
    return message;
  }

  create(body: Omit<MessagesDto, 'id'>): MessagesDto {
    const newMessage: MessagesDto = {
      id:
        this.messages.length > 0
          ? Math.max(...this.messages.map((message) => message.id)) + 1
          : 1,
      text: body.text,
      from: body.from,
      to: body.to,
      read: false,
      data: this.adjustTimeZone(new Date()),
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  update(id: number, body: Partial<Omit<MessagesDto, 'id'>>): MessagesDto {
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

  formatDate(date: Date) {
    return new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(date);
  }

  adjustTimeZone(date: Date) {
    const brasiliaOffSet = -3;
    return new Date(date.getTime() + brasiliaOffSet * 60 * 60 * 1000);
  }
}
