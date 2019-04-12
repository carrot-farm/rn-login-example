import React, { Component } from 'react';

import PageTemplate from '../components/common/PageTemplate';
import HomeContainer from '../containers/home/HomeContainer';

class Home extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  render() {
    return (
      <PageTemplate>
        <HomeContainer />
      </PageTemplate>
    );
  }
}

export default Home;
