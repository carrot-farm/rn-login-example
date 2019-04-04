import { Router } from 'express';
import auth from './auth';

const router = new Router();

router.use('/auth', auth);

router.get('/', (req, res) => {
  res.send('Hello');
});

export default router;
