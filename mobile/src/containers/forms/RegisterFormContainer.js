import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Alert } from 'react-native';

import * as authActions from '../../store/modules/auth';
import RegisterForm from '../../components/auth/RegisterForm';

// store 연결
@connect(
  state => ({
    penderTest: state.base.get('penderTest'),
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
  }),
)
@withNavigation
class RegisterFormContainer extends Component {
  // ===== 폼 서브밋
  onSubmit = async (value) => {
    try {
      const { AuthActions, navigation } = this.props;
      const result = await AuthActions.registUser(value);
      Alert.alert(result.data.message);
      // 가입 성공시
      if (!result.data.error) {
        navigation.navigate('LoginForm');
      }
    } catch (e) {
      Alert.alert(e.response.data.message);
    }
  };

  render() {
    const { onSubmit } = this;
    return (
      <RegisterForm onSubmit={onSubmit} />
    );
  }
}

export default RegisterFormContainer;
