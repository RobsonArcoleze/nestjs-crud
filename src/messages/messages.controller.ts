import type { MessagesInterface } from 'src/interfaces/messages/messages.interface';
import { MessagesService } from './messages.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  @HttpCode(200)
  findAll(): MessagesInterface[] {
    return this.messagesService.findAll();
  }

  @Get('/:id')
  findById(@Param('id', ParseIntPipe) id: number): MessagesInterface {
    return this.messagesService.findById(id);
  }

  @Post()
  create(@Body() body: Omit<MessagesInterface, 'id'>): MessagesInterface {
    return this.messagesService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<Omit<MessagesInterface, 'id'>>,
  ): MessagesInterface {
    return this.messagesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.messagesService.remove(id);
  }
}
