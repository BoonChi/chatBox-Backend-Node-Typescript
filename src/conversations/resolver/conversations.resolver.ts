import { ConversationsService } from "@conversations/conversations.service";
import { ConversationsCreateDto, ConversationsDto } from "@conversations/dto/conversations.dto";
import { ConversationEntity } from "@conversations/entity/conversations.entity";
import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver, Query, ResolveField, Parent } from "@nestjs/graphql";
import { UsersDto } from "@users/dto/users.dto";
import { UsersEntity } from "@users/entity/users.entity";
import { UsersService } from "@users/users.service";
import { AuthGQLGuard } from "src/auth/auth.gql.guard";
import { CurrentUser } from "src/common/decorator/user.decorator";

@Resolver(() => ConversationEntity)
@UseGuards(AuthGQLGuard)
export class ConversationResolver {
  constructor(
    private conversationsService: ConversationsService,
    private usersService: UsersService,
  ) { }

  @Query(() => [ConversationEntity])
  async conversations(@CurrentUser() user: UsersDto) {
    const result = await this.conversationsService.get(user);
    return result
  }

  @Mutation(() => ConversationEntity)
  async createConversations(@Args('createConversationInput') createConversationInput: ConversationsCreateDto, @CurrentUser() user: UsersDto) {
    return this.conversationsService.create(user, createConversationInput);
  }

  @ResolveField('users', () => UsersEntity)
  async getUser(@Parent() conversation: ConversationsDto) {
    const { user } = conversation;
    return this.usersService.getSingle(user)
  }

}