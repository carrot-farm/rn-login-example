import { Router } from 'express';
import { authMiddleware } from '../middlewares';
import auth from './auth';
import user from './user';

const router = new Router();

router.use('/auth', auth);
router.use('/user', authMiddleware);
router.use('/user', user);

router.get('/', (req, res) => {
  res.send('Hello');
});

export default router;
// export * from './meetups';
// export * from './groups';
