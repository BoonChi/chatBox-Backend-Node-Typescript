import { Field, InputType } from '@nestjs/graphql';
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
@InputType()
export class ConversationsCreateDto {
  @IsNotEmpty()
  @Field(() => String)
  text: string;
}
