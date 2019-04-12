import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Input as ElInput } from 'react-native-elements';
import { Field } from 'redux-form';
import { withNavigation } from 'react-navigation';

import common from '../../../styles/common';

// ===== Inputdml RFInput
const renderInput = (props) => {
  const { input, ...inputProps } = props;
  return (
    <ElInput
      {...input}
      {...inputProps}
    />
  );
};

// ===== redux form을 적용한 input
const Input = (props) => (
  <Field
    {...props}
    component={renderInput}
  />
);

// ===== row element
const Row = ({ children, ...props }) => {
  const sumProps = {
    ...props,
    style: { ...common.rowM, ...props.style },
  };
  return (<View {...sumProps} >{children}</View>);
};

// ===== container element
const Container = ({ children, ...props }) => {
  const sumProps = {
    ...props,
    style: { ...common.container, ...props.style },
  };
  return (<View {...sumProps} >{children}</View>);
};

// ===== 클릭시 screen 이동
@withNavigation
class Link extends Component {
  handleLinkClick = () => {
    const { navigation, to } = this.props;
    navigation.navigate(to);
  }
  render() {
    const { children } = this.props;
    return (
      <TouchableOpacity onPress={this.handleLinkClick}>{children}</TouchableOpacity >
    );
  }
}

export default {
  Input,
  Row,
  Container,
  Link,
};
