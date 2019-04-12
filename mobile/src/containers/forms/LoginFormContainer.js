import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { SecureStore } from 'expo';
import jwtDecoded from 'jwt-decode';

import * as authActions from '../../store/modules/auth';
import LoginForm from '../../components/auth/LoginForm';
import UserInfo from '../../components/auth/UserInfo';

// store 연결
@connect(
  state => ({
    userInfo: state.auth.get('userInfo'),
    token: state.auth.get('token'),
    refreshToken: state.auth.get('refreshToken'),
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
  }),
)
class LoginFormContainer extends Component {
  state = {
    isPass: null,
  };

  componentDidMount = async () => {
    const { AuthActions } = this.props;
    const authInfo = await SecureStore.getItemAsync('authInfo');
    // console.log('*** authInfo \n', authInfo);
    // 토큰이 있을 경우 유저 정보 셋팅
    if (authInfo) {
      AuthActions.setUserInfo(jwtDecoded(JSON.parse(authInfo).token));
    }
  };

  // ===== 에러 처리
  // eslint-disable-next-line react/sort-comp
  errorProcess = (e) => {
    if (e.response) {
      if (e.response.data === 'Unauthorized') {
        return Alert.alert('인증에 실패 하였습니다.');
      }
      Alert.alert(e.response.data.message);
    }
  };

  // ===== 로그인
  onSubmit = async ({ email, password }) => {
    const { AuthActions } = this.props;
    try {
      const { data } = await AuthActions.login({ email, password });
      SecureStore.setItemAsync('authInfo', JSON.stringify({
        token: data.token,
        refreshToken: data.refreshToken,
      }));
      // console.log('data', JSON.stringify(data));
    } catch (e) {
      this.errorProcess(e);
    }
  };

  // ===== 토큰 체크
  handleCheck = async () => {
    const { AuthActions } = this.props;
    try {
      const token = await SecureStore.getItemAsync('authInfo');
      const result = await AuthActions.tokenCheck(JSON.parse(token).token);
      if (result.data.success) {
        this.setState({
          isPass: true,
        });
      }
    } catch (e) {
      this.errorProcess(e);
    }
  };

  // ===== 리프레시 토큰
  handleRefreshToken = async () => {
    const { AuthActions } = this.props;
    try {
      const tokenInfo = await SecureStore.getItemAsync('authInfo');
      const oldToken = JSON.parse(tokenInfo);
      const { data } = await AuthActions.refreshToken(oldToken.refreshToken);
      await SecureStore.setItemAsync('authInfo', JSON.stringify({
        token: data.token,
        refreshToken: oldToken.refreshToken,
      }));
    } catch (e) {
      this.errorProcess(e);
    }
  };

  // ===== 로그아웃
  handleLogout = async () => {
    const { AuthActions } = this.props;
    await SecureStore.deleteItemAsync('authInfo');
    AuthActions.setUserInfo(null);
  };

  render() {
    const { onSubmit, handleLogout, handleCheck, handleRefreshToken } = this;
    const { isPass } = this.state;
    const { userInfo } = this.props;
    if (userInfo) {
      return (<UserInfo
        isPass={isPass}
        userInfo={userInfo}
        handleCheck={handleCheck}
        handleRefreshToken={handleRefreshToken}
        handleLogout={handleLogout}
      />);
    }
    return (
      <LoginForm onSubmit={onSubmit} />
    );
  }
}

export default LoginFormContainer;
