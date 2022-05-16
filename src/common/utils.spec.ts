import { comparePasswords } from './utils';

describe('Utility', () => {
  describe('validate password', () => {
    it('should return a promise', () => {
      const comparePassword = comparePasswords('a', 'b');
      expect(comparePassword).toEqual(Promise.resolve());
    });

    it('should return false', async () => {
      const comparePasswordRes = await comparePasswords('a', 'a');
      expect(comparePasswordRes).toBe(false);
    });
  });
});
