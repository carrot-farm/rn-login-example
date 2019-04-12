import { Router } from 'express';
import auth from './auth';

const router = new Router();

router.use('/auth', auth);

router.get('/test', (req, res) => {
  console.log('hello');
  res.json({ data: 'Hello' });
});

export default router;
