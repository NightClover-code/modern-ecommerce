import * as bcrypt from 'bcryptjs';

export const encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);

  const encryptedPassword = await bcrypt.hash(password, salt);

  return encryptedPassword;
};

export const imageFileFilter = (req: any, file: any, cb: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only images files allowed!'), false);
  }

  cb(null, true);
};
