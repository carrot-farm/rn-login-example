import { Router } from 'express';
import {
  register,
  login,
  jwtCheck,
} from './controller';

import { authMiddleware } from '../../middlewares';

const router = new Router();

router.post('/register', register);
router.post('/login', login);

// authMiddleware 에서 토큰 검증을 한뒤 req.decoded에 유저 정보를 붙이고
// jwtCheck에서는 성공에 대한 처리만 한다.
router.use('/check', authMiddleware);
router.get('/check', jwtCheck);

export default router;
