import { Router } from 'express';
import passport from 'passport';

import {
  register,
  login,
  check,
  refreshCheck,
  refreshToken,
} from './controller';

const router = new Router();

router.post('/register', register);
router.post('/local-login', login);
router.get('/refresh-token', passport.authenticate('refreshToken', { session: false }), refreshToken);

// authMiddleware 에서 토큰 검증을 한뒤 req.decoded에 유저 정보를 붙이고
// jwtCheck에서는 성공에 대한 처리만 한다.
// router.use('/check', authMiddleware);
router.get('/check', passport.authenticate('jwt', { session: false }), check);
router.get('/refresh-check', passport.authenticate('refreshToken', { session: false }), refreshCheck);

export default router;
