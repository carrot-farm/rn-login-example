import React, { Component } from 'react';

import LoginFormContainer from '../containers/forms/LoginFormContainer';

class Home extends Component {
  static navigationOptions = () => ({
    title: '로컬로그인',
  });

  render() {
    return (
      <LoginFormContainer />
    );
  }
}

export default Home;
