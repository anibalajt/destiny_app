import React from 'react'
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack"
import Index from "../index";
import Home from "../home/index";
import WebView from "../login/webView";
import Authorization from "../authorization"
import ModalScreen from "../ModalScreen"


const MainStack = createStackNavigator(
  {
    Login: { screen: Index },
    WebView: { screen: WebView },
    Home: { screen: Home },
    Authorization: { screen: Authorization },
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    MyModal: {
      screen: ModalScreen,
    },
  },
  {
    initialRouteName: "Main",
    mode: 'modal',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(MainStack);
// export default createAppContainer(MainStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
