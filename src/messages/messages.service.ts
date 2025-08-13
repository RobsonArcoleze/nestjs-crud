import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMessageDto } from './dto/update-message.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
  ) {}

  findAll() {
    return this.messageRepository.find();
  }

  async findById(id: number) {
    const message = await this.messageRepository.findOne({
      where: {
        id,
      },
    });
    if (!message)
      throw new NotFoundException(`Message with id ${id} not found`);

    return message;
  }

  async create(body: CreateMessageDto) {
    const messageEntity = this.messageRepository.create(body);
    return await this.messageRepository.save(messageEntity);
  }

  async update(id: number, body: UpdateMessageDto) {
    return await this.messageRepository.preload({
      id,
      ...body,
    });
  }

  async remove(id: number) {
    const messageById = await this.messageRepository.findOneBy({
      id,
    });

    if (!messageById)
      throw new NotFoundException(`Message with id ${id} not found`);
    return this.messageRepository.delete(messageById);
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
