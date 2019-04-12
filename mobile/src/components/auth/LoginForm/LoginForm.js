import React from 'react';
import { Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { reduxForm } from 'redux-form';
import Elements from '../../common/Elements';

import styles from './styles';
import common from '../../../styles/common';

const {
  Input,
  Row,
  Container,
  Link,
} = Elements;

const LoginForm = ({ onSubmit, handleSubmit }) =>
  (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <Container style={{ ...styles.container }}>
        <Row >
          <Input
            name='email'
            label='EMAIL'
            keyboardType='email-address'
          // autoFocus
          />
        </Row>
        <Row>
          <Input
            name='password'
            label='PASSWORD'
            secureTextEntry
          />
        </Row>
        <Row >
          <Button
            buttonStyle={{ ...common.buttonFull }}
            type='outline'
            title='로 그 인'
            onPress={handleSubmit(onSubmit)}
          />
        </Row>
        <Row>
          <Link to={'RegisterForm'}>
            <Text style={{ color: 'skyblue' }}>가입하기</Text>
          </Link>
        </Row>
      </Container>
    </ScrollView>
  );

export default reduxForm({
  form: 'login', // 폼 이름
})(LoginForm);
