import React, { Component } from 'react';

import GoogleAuthFirebaseContainer from '../containers/forms/GoogleAuthFirebaseContainer';

class Home extends Component {
  static navigationOptions = () => ({
    title: '구글 인증(Firebase)',
  });

  render() {
    return (
      <GoogleAuthFirebaseContainer />
    );
  }
}

export default Home;
