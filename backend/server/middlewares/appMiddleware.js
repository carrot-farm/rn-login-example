import bodyParser from 'body-parser';
import morgan from 'morgan';

const appMiddleware = (app) => {
  // express 용 body paser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  // api 응답 로그
  app.use(morgan('dev'));
};

export default appMiddleware;
