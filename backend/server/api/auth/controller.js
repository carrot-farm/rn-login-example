import jwt from 'jsonwebtoken';
import Joi from 'joi';
import passport from 'passport';

import { User } from '../../models';
import {
  tokenSecret,
  tokenOptions,
  refreshTokenSecret,
  refreshTokenOptions,
} from '../../../config';

// ========== 가입 요청
export const register = async (req, res) => {
  const data = req.body;
  const { email, password } = data;
  const schema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    // 8~16 영문자, 숫자, 특수 문자 포함.
    password: Joi.string().regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}/),
  });

  // 입력값 유효성 검사.
  const result = Joi.validate(data, schema);
  if (result.error) {
    res.status(400).json({
      error: true,
      message: '이메일혹은 비밀번호를 확인해 주십시요.',
    });
    return;
  }

  try {
    let newUser = await User.findOneByEmail(email);
    // user 정보가 있으면 에러 처리
    if (newUser) {
      throw new Error('이미 해당 유저가 존재 합니다.');
    }
    // user 정보 생성
    newUser = await User.create(email, password);
    // 최초 가입 유저일 경우 관리자 처리.
    const count = await User.count({}).exec();
    if (count === 1) {
      await newUser.assignAdmin();
    }
    // 리턴
    res.json({
      error: false,
      message: '가입이 성공적으로 처리 되었습니다.\n 로그인을 해주십시요',
    });
  } catch (error) {
    // console.log(error);
    res.status(409).json({
      error: true,
      message: error.message,
    });
  }
};

// ========== 로그인
export const login = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    // 8~16 영문자, 숫자, 특수 문자 포함.
    password: Joi.string().regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}/),
  });
  // 입력값 유효성 검사.
  const result = Joi.validate(data, schema);
  if (result.error) {
    res.status(400).json({
      error: true,
      message: '이메일혹은 비밀번호를 확인해 주십시요.',
    });
    return;
  }

  passport.authenticate('local', { session: false }, (err, user) => {
    if (err) {
      res.status(403).json({
        error: true,
        message: '대상을 찾을 수 없습니다.',
      });
    }

    // console.log(req.body);
    // 토큰에 저장할 유저 정보
    const tokenUser = {
      _id: user._id,
      emai: user.email,
      admin: user.admin,
    };
    // 로그인 처리.
    req.login(tokenUser, { session: false }, (_err) => {
      if (_err) {
        res.status(403).json({
          error: true,
          message: '대상을 찾을 수 없습니다.',
        });
      }

      const token = jwt.sign(tokenUser, tokenSecret, tokenOptions);
      const refreshToken = jwt.sign(tokenUser, refreshTokenSecret, refreshTokenOptions);
      // console.log('token', token)
      res.json({
        error: false,
        userInfo: tokenUser,
        token,
        refreshToken,
      });
    });
  })(req, res);
};

// ========== accessToken 재발행
export const refreshToken = (req, res) => {
  const tokenUser = {
    _id: req.user._id,
    emai: req.user.email,
    admin: req.user.admin,
  };
  const token = jwt.sign(tokenUser, tokenSecret, tokenOptions);
  res.json({
    error: false,
    success: true,
    token,
  });
};

// ========== jwt 토큰 검증
export const check = async (req, res) => {
  res.json({
    error: false,
    success: true,
    message: 'pass jwt check',
  });
};

// ========== refresh 토큰 검증
export const refreshCheck = async (req, res) => {
  res.json({
    error: false,
    success: true,
    message: 'pass refresh check',
  });
};
