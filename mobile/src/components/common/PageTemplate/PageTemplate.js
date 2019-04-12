import React, { Component } from 'react';
import { View } from 'react-native';

class PageTemplate extends Component {
  render() {
    const { children } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </View>
    );
  }
}

export default PageTemplate;
