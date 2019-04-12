import React from 'react';
import { ScrollView, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { reduxForm } from 'redux-form';
import Elements from '../../common/Elements';

import styles from './styles';
import common from '../../../styles/common';

const {
  Input,
  Row,
  Container,
} = Elements;

const RegisterForm = ({ onSubmit, handleSubmit }) =>
  (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <Container style={{ ...styles.container }}>
        <Row >
          <Input
            name='email'
            label='EMAIL'
            keyboardType='email-address'
            autoFocus
          />
        </Row>
        <Row>
          <Input
            name='password'
            label='PASSWORD'
            secureTextEntry
          />
          <Text style={{ fontSize: 9, color: '#aaaaaa', lineHeight: 15 }}>8~16 영문자, 숫자, 특수문자</Text>
        </Row>
        <Row >
          <Button
            buttonStyle={{ ...common.buttonFull }}
            type='outline'
            title='가입하기'
            onPress={handleSubmit(onSubmit)}
          />
        </Row>
      </Container>
    </ScrollView>
  );

export default reduxForm({
  form: 'registerForm', // 폼 이름
})(RegisterForm);
