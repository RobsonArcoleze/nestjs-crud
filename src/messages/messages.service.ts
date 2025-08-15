import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMessageDto } from './dto/update-message.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';
import { Repository } from 'typeorm';
import { PersonService } from 'src/person/person.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
    private readonly personService: PersonService,
  ) {}

  async findAll(pagination?: PaginationDto) {
    const paginationDto: PaginationDto = plainToInstance(
      PaginationDto,
      pagination ?? {},
    );
    const findOptions: any = {
      skip: paginationDto.limit ? paginationDto.skip : 0,
      take: paginationDto.limit ?? null,
      order: { id: 'DESC' },
    };

    const [messages, count] =
      await this.messageRepository.findAndCount(findOptions);

    return {
      data: messages,
      count,
      limit: paginationDto.limit,
      skip: paginationDto.skip,
      page: pagination?.page ?? 1,
    };
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
    await this.personService.findOne(body.from.id);
    await this.personService.findOne(body.to.id);

    const messageEntity = this.messageRepository.create(body);
    return await this.messageRepository.save(messageEntity);
  }

  async update(id: number, body: UpdateMessageDto) {
    const message = await this.messageRepository.preload({
      id,
      ...body,
    });
    if (!message)
      throw new NotFoundException(`Message with id ${id} not found`);
    return await this.messageRepository.save(message);
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
