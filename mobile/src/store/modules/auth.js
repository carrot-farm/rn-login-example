import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map } from 'immutable';

import * as api from '../../lib/api';

// action type
const REGIST_USER = 'auth/REGIST_USER';
const LOGIN = 'auth/LOGIN';
const SET_USER_INFO = 'auth/SET_USER_INFO';
const TOKEN_CHECK = 'auth/TOKEN_CHECK';
const REFRESH_TOKEN = 'auth/REFRESH_TOKEN';

// 유저 가입
export const registUser = createAction(REGIST_USER, api.registUser, meta => meta);
export const login = createAction(LOGIN, api.login, meta => meta);
export const setUserInfo = createAction(SET_USER_INFO);
// 토큰 유효성 확인.
export const tokenCheck = createAction(TOKEN_CHECK, api.tokenCheck, meta => meta);
// 리프레시 토큰을 이용한 토큰 재발급
export const refreshToken = createAction(REFRESH_TOKEN, api.refreshToken, meta => meta);

const initialState = Map({
  userInfo: null,
  token: null,
  refreshToken: null,
});

export default handleActions({
  [SET_USER_INFO]: (state, action) => state.set('userInfo', action.payload),
  ...pender({
    type: REGIST_USER,
    onSuccess: (state, action) => action.payload.data,
  }),
  // 로그인
  ...pender({
    type: LOGIN,
    onSuccess: (state, action) => {
      const data = action.payload.data;
      if (!data.error) {
        return state.set('userInfo', data.userInfo)
          .set('token', data.token)
          .set('refreshToken', data.refreshToken);
      }
      return state;
    },
    onFailure: (state, action) => console.log(JSON.stringify(action.response.payload)),
  }),
  // 토큰 유효성 검사
  ...pender({
    type: TOKEN_CHECK,
    onSuccess: (state) => (state),
  }),
  // 리프레시 토큰
  ...pender({
    type: REFRESH_TOKEN,
    onSuccess: (state, action) => {
      const data = action.payload.data;
      if (!data.error) {
        return state.set('token', data.token);
      }
      return state;
    },
  }),
}, initialState);

