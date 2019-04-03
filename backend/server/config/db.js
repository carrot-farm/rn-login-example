import mongoose from 'mongoose';
import { mondbUri } from '../../config';

export default () => {
  // 몽구스 자체 말고 글로벌 promise 사용
  mongoose.Promise = global.Promise;
  // mongodb 접속
  mongoose.connect(mondbUri, {
    useCreateIndex: true,
    useNewUrlParser: true,
  });

  mongoose.connection
    .once('open', () => console.log('Mongodb running'))
    .on('error', err => console.error(err));
};
