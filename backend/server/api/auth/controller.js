import jwt from 'jsonwebtoken';

import { User } from '../../models';
import { secret } from '../../../config';

// ========== 가입 요청
export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    let newUser = await User.findOneByUsername(username);

    // user 정보가 있으면 에러 처리
    if (newUser) {
      throw new Error('이미 해당 유저가 존재 합니다.');
    }

    // user 정보 생성
    newUser = await User.create(username, password);

    // 최초 가입 유저일 경우 관리자 처리.
    const count = await User.count({}).exec();
    if (count === 1) {
      await newUser.assignAdmin();
    }

    res.json({
      error: false,
      message: '가입이 성공적으로 처리 되었습니다.\n 다시 로그인 해주십시요',
    });
  } catch (error) {
    console.log(error);
    res.status(409).json({
      error: true,
      message: error.message,
    });
  }
};

// ========== 로그인
export const login = async (req, res) => {
  const { username, password } = req.body;
  const tokenOptions = {
    expiresIn: '7d',
    issuer: 'carrottodo.net',
    subject: 'userInfo',
  };

  try {
    // 유저 정보 가져오기.
    const user = await User.findOneByUsername(username);
    // console.log(user);

    // 유저 정보가 없을 경우
    if (!user) {
      throw new Error('유저를 찾을 수 없습니다.');
    }

    // 패스워드 검증
    if (!user.verify(password)) {
      throw new Error('비밀번호가 틀렸습니다.');
    }

    // 토큰에 입력될 정보.
    const payload = {
      _id: user._id,
      admin: user.admin,
      username,
    };

    // 토큰 생성
    const token = await jwt.sign(payload, secret, tokenOptions);

    res.json({
      error: false,
      token,
    });
  } catch (error) {
    res.status(403).json({
      error: true,
      message: error.message,
    });
  }
};

// ========== jwt 토큰 검증
export const jwtCheck = async (req, res) => {
  res.json({
    error: false,
    userInfo: req.decoded,
  });
};
