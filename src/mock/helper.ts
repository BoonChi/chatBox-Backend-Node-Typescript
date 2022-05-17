import { Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<T>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
  }),
);

export const mockedConversationService = {
  create: jest.fn(),
};

export const mockedJwtService = {
  decode: jest.fn((socket) => socket),
};
