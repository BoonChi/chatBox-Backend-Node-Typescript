import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersDto } from '@users/dto/users.dto';
import { ConversationsService } from './conversations.service';
import {
  ConversationsCreateDto,
  ConversationsDto,
} from './dto/conversations.dto';

@Controller('api/conversations')
export class ConversationsController {
  constructor(readonly conversationsService: ConversationsService) {}

  @Get()
  @UseGuards(AuthGuard())
  async findByUser(@Req() req: any): Promise<ConversationsDto[]> {
    const user = req.user as UsersDto;
    return await this.conversationsService.get(user);
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Body() createDto: ConversationsCreateDto,
    @Req() req: any,
  ): Promise<ConversationsDto> {
    const user = req.user as UsersDto;
    return await this.conversationsService.create(user, createDto);
  }
}
