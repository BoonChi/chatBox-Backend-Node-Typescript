import { IsDate, IsString, IsUUID } from 'class-validator';
import { ConversationEntity } from '../entity/conversations.entity';

export class ConversationsDomain implements Readonly<ConversationsDomain> {
  @IsUUID()
  id: string;

  @IsString()
  text: string;

  @IsString()
  user: string;

  @IsDate()
  createdDate: Date;

  public static toDto(entity: ConversationEntity) {
    return {
      id: entity.id,
      text: entity.text,
      time: entity.createdDate.toLocaleString(),
      user: entity.owner.username,
    };
  }
}
