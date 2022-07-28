import { EntitySchema, Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<T>;
};

export const repositoryMockFactory: () => MockType<Repository<EntitySchema>> =
  jest.fn(() => ({
    findOne: jest.fn((entity) => entity),
  }));

export const mockedConversationService = {
  create: jest.fn(),
};

export const mockedJwtService = {
  decode: jest.fn((socket) => socket),
  sign: jest.fn().mockReturnValue('test token'),
};

export const mockedAuthService = {
  register: jest.fn(),
  login: jest.fn(),
};

export const mockedUsersService = {
  register: jest.fn(),
  login: jest.fn(),
  create: jest.fn().mockReturnValue({
    email: 'test@gmail.com',
  }),
  findByLogin: jest.fn().mockReturnValue('test@gmail.com'),
  getSingle: jest.fn().mockReturnValue('test@gmail.com'),
};

export const mockedRedisCacheService = {
  set: jest.fn(),
  get: jest.fn(),
  reset: jest.fn(),
  del: jest.fn(),
};
