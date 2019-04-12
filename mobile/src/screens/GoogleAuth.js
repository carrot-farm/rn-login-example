import React, { Component } from 'react';

import GoogleAuthContainer from '../containers/forms/GoogleAuthContainer';

class Home extends Component {
  static navigationOptions = () => ({
    title: '구글 인증(AuthSession)',
  });
  render() {
    return (
      <GoogleAuthContainer />
    );
  }
}

export default Home;
