import { MessagesService } from './messages.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {

    constructor(private readonly messagesService: MessagesService){}

    @Get()
    findAll() {
        return this.messagesService.findAll();
    }

    @Get('/:id')
    findById(@Param('id') id: string) {
        return this.messagesService.findById(id);
    }

    @Post()
    create(@Body() body: any){
        return this.messagesService.create(JSON.stringify(body))
    }
}
