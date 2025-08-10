import { MessagesService } from './messages.service';
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {

    constructor(private readonly messagesService: MessagesService){}

    @Get()
    @HttpCode(200)
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

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.messagesService.update(id, body)
    }

    @Delete(':id')
    remove(@Param('id') id: string): void{
        this.messagesService.remove(id);
    }
}
