import mongoose from 'mongoose';
import crypto from 'crypto';

import { secret } from '../../config';

const Schema = mongoose.Schema;
const User = new Schema({
  username: String,
  password: String,
  admin: { type: Boolean, default: false },
});

// 유저 생성
User.statics.create = function (username, password) {
  // 비밀번호 암호화
  const encrypt = crypto.createHmac('sha1', secret)
    .update(password)
    .digest('base64');

  const user = new this({
    username,
    password: encrypt,
  });

  return user.save();
};

// username 으로 사용자 정보 찾기
User.statics.findOneByUsername = function (username) {
  return this.findOne({
    username,
  }).exec();
};

// 패스워드 검증
User.methods.verify = function (password) {
  const encrypt = crypto.createHmac('sha1', secret)
    .update(password)
    .digest('base64');
  return this.password === encrypt;
};

// 관리자 생성
User.methods.assignAdmin = function () {
  this.admin = true;
  return this.save();
};

export default mongoose.model('User', User);

