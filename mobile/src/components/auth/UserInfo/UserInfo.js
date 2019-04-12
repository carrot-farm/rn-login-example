import React from 'react';
import { Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import Elements from '../../common/Elements';

import styles from './styles';
import common from '../../../styles/common';

const {
  Row,
  Container,
} = Elements;

const UserInfo = ({
  isPass,
  userInfo,
  handleLogout,
  handleCheck,
  handleRefreshToken,
}) =>
  (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <Container style={{ ...styles.container }}>
        <Row>
          <Text>{isPass && 'tokenPass'}</Text>
        </Row>
        <Row>
          <Text>{JSON.stringify(userInfo)}</Text>
        </Row>
        <Row>
          <Button
            buttonStyle={{ ...common.buttonFull }}
            type='outline'
            title='체크'
            onPress={handleCheck}
          />
        </Row>
        <Row>
          <Button
            buttonStyle={{ ...common.buttonFull }}
            type='outline'
            title='리프레시토큰'
            onPress={handleRefreshToken}
          />
        </Row>
        <Row>
          <Button
            buttonStyle={{ ...common.buttonFull }}
            type='outline'
            title='로그아웃'
            onPress={handleLogout}
          />
        </Row>
      </Container>
    </ScrollView>
  );

export default UserInfo;
