import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { createConversationDto } from './dto/create.dto';
import { getConversationDto, mapper } from './dto/get.dto';

@Controller('api/conversations')
export class ConversationsController {
  constructor(readonly conversationsService: ConversationsService) { }

  @Get()
  async findAll(): Promise<mapper[]> {
    return await this.conversationsService.get();
  }

  @Post()
  async create(@Body() createDto: createConversationDto): Promise<getConversationDto> {
    return await this.conversationsService.create(createDto);
  }
}

