import mongoose from 'mongoose';
import crypto from 'crypto';

import { secret } from '../../config';

const Schema = mongoose.Schema;
const User = new Schema({
  email: String,
  password: String,
  admin: { type: Boolean, default: false },
});

// 유저 생성
User.statics.create = function (email, password) {
  // 비밀번호 암호화
  const encrypt = crypto.createHmac('sha1', secret)
    .update(password)
    .digest('base64');

  const user = new this({
    email,
    password: encrypt,
  });

  return user.save();
};

// ==========email과 password를 이용해 사용자 정보 찾기.
User.statics.findOneByEmailAndPassword = function (email, password) {
  const encrypt = crypto.createHmac('sha1', secret)
    .update(password)
    .digest('base64');

  return this.findOne({ email, password: encrypt }).exec();
};

// ========== email로 사용자 정보 찾기
User.statics.findOneByEmail = function (email) {
  return this.findOne({
    email,
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

