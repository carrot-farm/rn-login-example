import express from 'express';

import { port } from '../config';
import { appMiddleware } from './middlewares';
import {
  localStrategy,
  jwtStrategy,
  refreshStrategy,
} from './helper/passport';
import dbConfig from './config/db';
import api from './api';

const app = express();

const PORT = process.env.PORT || port;

// 몽구스 접속
dbConfig();

// middleware 실행
appMiddleware(app);

// 라우팅
app.use('/api', api);

// strategy
jwtStrategy();
refreshStrategy();
localStrategy();

// express 시작
app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`App listen to port:${PORT}`);
  }
});
