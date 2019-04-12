import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Alert } from "react-native";
import { SecureStore, AuthSession } from "expo";
import jwtDecoded from "jwt-decode";

import * as authActions from "../../store/modules/auth";
import GooglAuth from "../../components/auth/GooglAuth";
import UserInfo from "../../components/auth/UserInfo";
import { googleAuthUrl } from "../../../config";
// import { googleClientId } from '../../../../backend/config';

// store 연결
@connect(
  state => ({
    userInfo: state.auth.get("userInfo"),
    token: state.auth.get("token"),
    refreshToken: state.auth.get("refreshToken")
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)
class GoogleAuthContainer extends Component {
  state = {
    isPass: null,
    userInfo: null
  };

  componentDidMount = async () => {
    const { AuthActions } = this.props;
    const authInfo = await SecureStore.getItemAsync("authInfo");
    // console.log('*** authInfo \n', authInfo);
    // 토큰이 있을 경우 유저 정보 셋팅
    if (authInfo) {
      AuthActions.setUserInfo(jwtDecoded(JSON.parse(authInfo).token));
    }
  };
  // ===== 에러 처리
  // eslint-disable-next-line react/sort-comp
  errorProcess = e => {
    if (e.response) {
      if (e.response.data === "Unauthorized") {
        return Alert.alert("인증에 실패 하였습니다.");
      }
      Alert.alert(e.response.data.message);
    }
  };

  // ===== 로그인
  onSubmit = async () => {
    const { AuthActions } = this.props;
    try {
      const redirectUrl = AuthSession.getRedirectUrl();
      let url = googleAuthUrl;
      url += this.toQueryString({
        redirect_uri: redirectUrl
      });
      const result = await AuthSession.startAsync({
        authUrl: url
      });
      this.setState({
        userInfo: result.params
      });
    } catch (e) {
      this.errorProcess(e);
    }
  };

  toQueryString(params) {
    return (
      "?" +
      Object.entries(params)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&")
    );
  }

  // ===== 토큰 체크
  handleCheck = async () => {
    const { AuthActions } = this.props;
    try {
      const token = await SecureStore.getItemAsync("authInfo");
      const result = await AuthActions.tokenCheck(JSON.parse(token).token);
      if (result.data.success) {
        this.setState({
          isPass: true
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
      const tokenInfo = await SecureStore.getItemAsync("authInfo");
      const oldToken = JSON.parse(tokenInfo);
      const { data } = await AuthActions.refreshToken(oldToken.refreshToken);
      await SecureStore.setItemAsync(
        "authInfo",
        JSON.stringify({
          token: data.token,
          refreshToken: oldToken.refreshToken
        })
      );
    } catch (e) {
      this.errorProcess(e);
    }
  };

  // ===== 로그아웃
  handleLogout = async () => {
    const { AuthActions } = this.props;
    await SecureStore.deleteItemAsync("authInfo");
    AuthActions.setUserInfo(null);
  };

  render() {
    const { onSubmit, handleLogout, handleCheck, handleRefreshToken } = this;
    const { isPass, userInfo } = this.state;
    return <GooglAuth onSubmit={onSubmit} userInfo={userInfo} />;
  }
}

export default GoogleAuthContainer;
