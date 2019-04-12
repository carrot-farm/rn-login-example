import React, { Component } from "react";
import { AppLoading } from "expo";
import { Provider } from "react-redux";
import EStyleSheet from "react-native-extended-stylesheet";

import { fontAssets } from "./src/lib/cachedFonts";
import GlobalStyles from "./src/styles/global";
import Root from "./src/Root";
import configure from "./src/store/configure";

const store = configure();

// 공통적으로 사용될 스타일 셋팅
EStyleSheet.build(GlobalStyles);

// 옐로우 박스 에러 모달 비활성화 dismiss all
console.disableYellowBox = true;

export default class App extends Component {
  state = {
    fontsLoaded: false
  };

  componentDidMount() {
    this.loadAssets();
  }

  // 에셋 로드
  async loadAssets() {
    // 폰트 로딩
    await Promise.all(fontAssets);
    this.setState({ fontsLoaded: true });
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    }
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}
