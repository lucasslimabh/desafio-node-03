import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '../', '../', 'tmp'),
    filename(request, file, callback) {
      const hash = crypto.randomBytes(10).toString('HEX');
      const filename = `${hash}-${file}`;

      return callback(null, filename);
    },
  }),
};
