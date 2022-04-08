import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { comparePasswords } from 'src/common/utils';
import { Repository } from 'typeorm';
import { UsersDomain } from './domain/users.domain';
import { LoginUserDto, UsersCreateDto, UsersDto } from './dto/users.dto';
import { UsersEntity } from './entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepo: Repository<UsersEntity>,
  ) {}

  private async findUser(username: UsersDto['username'], newUser = false) {
    const user = await this.usersRepo.findOne({ username });
    if (!user && !newUser) {
      throw new HttpException(
        `Username ${username} doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  public async getSingle(username: string, entity = false) {
    const result = await this.findUser(username);
    if (!entity) {
      return UsersDomain.toDto(result);
    }
    return result;
  }

  public async create(createDto: UsersCreateDto) {
    const user = await this.findUser(createDto.username, true);
    if (user) {
      throw new HttpException(
        `Username ${createDto.username} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = this.usersRepo.create(createDto);
    const userCreated = await this.usersRepo.save(result);
    if (!userCreated.id) {
      throw new HttpException(
        `Username ${createDto.username} failed to register`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return UsersDomain.toDto(result);
  }

  async findByLogin({
    username,
    password,
  }: LoginUserDto): Promise<UsersDto['username']> {
    const user = await this.findUser(username);
    const areEqual = await comparePasswords(user.password, password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user.username;
  }
}
