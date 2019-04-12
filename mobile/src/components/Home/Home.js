import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

import styles from './styles';
import Elements from '../common/Elements';

const {
  Row,
} = Elements;

const Home = ({ handleButtonClick }) => (
  <View style={styles.root}>
    <Row>
      <Button
        type='outline'
        title={'로컬 로그인( JWT )'}
        buttonStyle={styles.buttons}
        onPress={() => handleButtonClick('LoginForm')}
      />
    </Row>
    <Row>
      <Button
        type='outline'
        title={'구글 로그인(AuthSession)'}
        buttonStyle={styles.buttons}
        onPress={() => handleButtonClick('GoogleAuth')}
      />
    </Row>
    <Row>
      <Button
        type='outline'
        title={'구글 로그인(Firebase)'}
        buttonStyle={styles.buttons}
        onPress={() => handleButtonClick('GoogleAuthFirebase')}
      />
    </Row>
  </View>
);

export default Home;
