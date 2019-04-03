import express from 'express';
import { port } from '../config';
import dbConfig from './config/db';
import { appMiddleware } from './middlewares';
import api from './api';

const app = express();

// 몽구스 접속
dbConfig();

// middleware 실행
appMiddleware(app);

// 라우팅
app.use('/api', api);

const PORT = process.env.PORT || port;

// express 시작
app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`App listen to port:${PORT}`);
  }
});
