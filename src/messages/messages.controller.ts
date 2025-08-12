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
import { MessagesDto } from './dto/messages.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto copy';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  @HttpCode(200)
  findAll(): MessagesDto[] {
    return this.messagesService.findAll();
  }

  @Get('/:id')
  findById(@Param('id', ParseIntPipe) id: number): MessagesDto {
    return this.messagesService.findById(id);
  }

  @Post()
  create(@Body() body: CreateMessageDto): MessagesDto {
    return this.messagesService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateMessageDto,
  ): MessagesDto {
    return this.messagesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.messagesService.remove(id);
  }
}
