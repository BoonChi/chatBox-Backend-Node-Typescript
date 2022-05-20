import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersDto } from '@users/dto/users.dto';
import { IReq } from '@common/type/common.type';
import { ConversationsService } from './conversations.service';
import {
  ConversationsCreateDto,
  ConversationsDto,
} from './dto/conversations.dto';

@Controller('api/conversations')
@UseGuards(AuthGuard())
export class ConversationsController {
  constructor(readonly conversationsService: ConversationsService) {}

  @Get()
  async findByUser(@Req() req: IReq): Promise<ConversationsDto[]> {
    const user = req.user as UsersDto;
    return await this.conversationsService.get(user);
  }

  @Post()
  async create(
    @Body() createDto: ConversationsCreateDto,
    @Req() req: IReq,
  ): Promise<ConversationsDto> {
    const user = req.user as UsersDto;
    return await this.conversationsService.create(user, createDto);
  }
}
