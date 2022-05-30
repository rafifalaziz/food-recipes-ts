import {NextFunction, Request, Response} from 'express';
import multer from 'multer';
import path from 'path';
import * as uuid from 'uuid';

const cwd = path.join(__dirname, '..');

const storage = multer.diskStorage({
  destination: path.join(cwd, 'upload'),
  filename: function (_, file, cb) {
    console.log(path.extname(file.originalname));
    cb(null, uuid.v4() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fieldNameSize: 100,
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: function (_, file, cb) {
    const filetypes = /jpeg|png|jpg/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('IMAGE_ONLY'));
    }
  },
}).single('image');

export default function (
  req: Request,
  res: Response,
  next: NextFunction
): void {
  return upload(req, res, err => {
    if (err) {
      return res.status(400).send({
        status: 400,
        message: 'BAD_REQUEST',
        errors: {
          msg: err.message,
          param: 'image',
        },
      });
    }
    return next();
  });
}
