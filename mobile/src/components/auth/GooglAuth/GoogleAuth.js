import React from 'react';
import { ScrollView, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { reduxForm } from 'redux-form';

import Elements from '../../common/Elements';
import styles from './styles';
import common from '../../../styles/common';

const {
  Row,
  Container,
} = Elements;

const GoogleAuth = ({ onSubmit, handleSubmit, userInfo }) =>
  (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <Container style={{ ...styles.container }}>
        <Row>
          <Text>{JSON.stringify(userInfo)}</Text>
        </Row>
        <Row >
          <Button
            buttonStyle={{ ...common.buttonFull }}
            type='outline'
            title='Google Login'
            onPress={handleSubmit(onSubmit)}
          />
        </Row>
      </Container>
    </ScrollView>
  );

export default reduxForm({
  form: 'auth/google', // 폼 이름
})(GoogleAuth);
