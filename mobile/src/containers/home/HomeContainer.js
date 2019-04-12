import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Button, View, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Home from '../../components/Home';
import * as baseActions from '../../store/modules/base';

@withNavigation
@connect(
  state => ({
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  }),
)
class HomeContainer extends Component {
  // 클릭시 네비게이션 이동
  handleButtonClick = (navi) => {
    const { navigation } = this.props;
    navigation.navigate(navi);
  }

  handleTest = () => {
    const { BaseActions } = this.props;
    console.log('*** click test\n');
    BaseActions.penderTest();
  };

  render() {
    const { handleButtonClick } = this;
    return (
      <View>
        <Home
          handleButtonClick={handleButtonClick}
        />
        <View>

        <Button onPress={this.handleTest} title="test" />
        </View>
      </View>
    );
  }
}

export default HomeContainer;
