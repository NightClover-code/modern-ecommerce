export const imageFileFilter = (req: any, file: any, cb: any) => {
  if (!file.mimetype.match(/^image\/(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};
