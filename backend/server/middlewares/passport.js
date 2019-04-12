import passport from 'passport';
import JWTPassport from 'passport-jwt';
import localPassport from 'passport-local';
import googlePassport from 'passport-google-auth';

import { User } from '../models';
import {
  tokenSecret,
  refreshTokenSecret,
  googleClientId,
  googleClientSecret,
  googleCallbackUrl,
} from '../../config';

// ========== jwt 인증 전략
export const jwtStrategy = () => {
  const { Strategy, ExtractJwt } = JWTPassport;

  passport.use(
    'jwt',
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromHeader('x-access-token'), // 토큰의 헤더 지정.
        secretOrKey: tokenSecret,
      },
      (payload, done) => {
        done(null, payload);
      }
    )
  );
};

// ========== refreshToken 인증
export const refreshStrategy = () => {
  const { Strategy, ExtractJwt } = JWTPassport;
  passport.use(
    'refreshToken',
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromHeader('x-refresh-token'), // 토큰의 헤더 지정.
        secretOrKey: refreshTokenSecret,
      },
      (payload, done) => {
        done(null, payload);
      }
    )
  );
};

// ========== 로컬 인증 전략
export const localStrategy = () => {
  const strategy = localPassport.Strategy;
  passport.use(
    new strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: false, // 콜백에 req 객체 안넘김.
        session: false, // jwt를 사용할 것이기 때문에 session 사용안함.
      },
      async (email, password, done) => {
        try {
          const user = await User.findOneByEmailAndPassword(email, password);
          if (!user) {
            throw new Error(
              '대상을 찾을 수 없습니다. 아이디와 비밀번호를 확인하십시요'
            );
          }
          return done(null, user);
        } catch (e) {
          done(null, false, {
            errot: true,
            message: e.message,
          });
        }
      }
    )
  );
};

// ========== 구글 인증 전략
export const googleStrategy = () => {
  const strategy = googlePassport.Strategy;
  passport.use(
    'google',
    new strategy(
      {
        clientId: googleClientId,
        clientSecret: googleClientSecret,
        callbackURL: googleCallbackUrl,
        passReqToCallback: true,
        session: false,
      },
      (req, token, tokenS, profile, done) => {
        // console.log('***** req', req.query);
        // console.log('***** token', token);
        // console.log('***** tokenSecret', tokenS);
        // console.log('***** profile', profile);
        // console.log('***** done', done);
        done(null, { tes: 'test' });
      }
    )
  );
};

export default {
  jwtStrategy,
  refreshStrategy,
  localStrategy,
  googleStrategy,
};
