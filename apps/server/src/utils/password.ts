import * as argon2 from 'argon2';

export const hashPassword = async (password: string): Promise<string> => {
  return argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
  });
};

export const verifyPassword = async (
  hashedPassword: string,
  plainPassword: string,
): Promise<boolean> => {
  try {
    const result = await argon2.verify(hashedPassword, plainPassword);
    console.log('RESULT', result);
    return result;
  } catch (error) {
    console.log('ERROR', error);
    return false;
  }
};
