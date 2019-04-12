import React, { Component } from "react";
import { Text, Button, View } from "react-native";
import { GoogleSignIn } from "expo";

import { googleClientId } from "../../../config";

// store 연결
class GoogleAuthFirebaseContainer extends Component {
  state = {
    info: null
  };

  componentDidMount = async () => {
    try {
      await GoogleSignIn.initAsync({ clientId: googleClientId });
    } catch ({ message }) {
      this.setState({
        info: "*** Initialize Error\n" + message
      });
    }
  };

  // ===== 로그인
  onSubmit = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === "success") {
        this.setState({
          info: JSON.stringify(user)
        });
      }
    } catch ({ message }) {
      this.setState({
        info: "*** Login Error\n" + message
      });
    }
  };

  render() {
    return (
      <View>
        <Text>{this.state.info}</Text>
        <Button title="signIn" onPress={this.onSubmit} />
      </View>
    );
  }
}

export default GoogleAuthFirebaseContainer;
