import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversationEntity } from './entity/conversations.entity';
import { ConversationsDomain } from './domain/conversations.domain';
import {
  ConversationsCreateDto,
  ConversationsDto,
} from './dto/conversations.dto';
import { UsersDto } from '@users/dto/users.dto';
import { UsersService } from '@users/users.service';

@Injectable()
export class ConversationsService {
  constructor(private usersService: UsersService) { }
  @InjectRepository(ConversationEntity)
  private readonly conversationsRepo: Repository<ConversationEntity>;

  public async get({ email }: UsersDto) {
    const owner = await this.usersService.getSingle(email);
    const result = await this.conversationsRepo.find({
      where: { owner },
      relations: ['owner'],
    });
    if (!result) {
      throw new HttpException(
        `Conversation of ${email} doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return result.map((each) => ConversationsDomain.toDto(each));
  }

  async create(
    { email }: UsersDto,
    createDto: ConversationsCreateDto,
  ): Promise<ConversationsDto> {
    const { text } = createDto;

    // get the user from db
    const owner = await this.usersService.getSingle(email, true);
    const conversations: ConversationEntity = this.conversationsRepo.create({
      text,
      owner,
    });
    await this.conversationsRepo.save(conversations);
    return ConversationsDomain.toDto(conversations);
  }
}
