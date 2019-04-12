import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import penderMiddleware from 'redux-pender';
import { reducer as formReducer } from 'redux-form';

import * as modules from './modules';

const reducers = combineReducers({ ...modules, form: formReducer });// 모듈 합치기
const middlewares = [penderMiddleware()]; // 펜더 미들웨어 생성

const composeEnhancers = compose;

const configure = (preloadedState) => createStore(reducers, preloadedState,
  composeEnhancers(
    applyMiddleware(...middlewares)
  )
);

export default configure;
