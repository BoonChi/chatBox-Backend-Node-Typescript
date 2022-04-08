import { IsNotEmpty } from 'class-validator';

export class ConversationsDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  time: string;
}

export class ConversationsCreateDto {
  @IsNotEmpty()
  text: string;
}
