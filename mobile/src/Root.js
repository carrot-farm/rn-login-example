import 'react';
import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

import {
  Home,
  LoginForm,
  RegisterForm,
  GoogleAuth,
  GoogleAuthFirebase,
} from './screens';

const MainScreens = createStackNavigator(
  {
    Home,
    LoginForm,
    RegisterForm,
    GoogleAuth,
    GoogleAuthFirebase,
  }
);

export default createAppContainer(MainScreens);
