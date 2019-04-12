import React, { Component } from 'react';

import RegisterFormContainer from '../containers/forms/RegisterFormContainer';

class RegisterForm extends Component {
  static navigationOptions = () => ({
    title: '가입',
  });

  render() {
    return (
      <RegisterFormContainer />
    );
  }
}

export default RegisterForm;
