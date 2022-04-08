import { compare } from 'bcrypt';

export const comparePasswords = async (
  userPassword: string,
  currentPassword: string,
) => {
  return await compare(currentPassword, userPassword);
};
