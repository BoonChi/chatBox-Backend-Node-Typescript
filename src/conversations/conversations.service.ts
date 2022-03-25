import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './conversation.entity';
import { createConversationDto } from './dto/create.dto';

@Injectable()
export class ConversationsService {
  constructor(@InjectRepository(Conversation) private readonly conversationsRepo: Repository<Conversation>) { }

  public async get() {
    const result = await this.conversationsRepo.find()
    const array = []
    result.forEach((each) => {
      const time = each.createdDate.toLocaleString()
      array.push({
        id: each.id, time, text: each.text, sent: each.sent
      })
    })
    return array;
  }

  public async create(createDto: createConversationDto) {
    const result = this.conversationsRepo.create(createDto)
    await this.conversationsRepo.save(result);
    return result;
  }
}