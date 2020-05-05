import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';

import Index from '../index';
import Home from '../home/index';
import WebView from '../login/webView';
import Authorization from '../authorization';
import ModalScreen from '../ModalScreen';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const MainStackScreen = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator headerMode="none">
        <MainStack.Screen name="Login" component={Index} />
        <MainStack.Screen name="WebView" component={WebView} />
        <MainStack.Screen name="Authorization" component={Authorization} />
        <MainStack.Screen name="Home" component={Home} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

// const MainStack = createStackNavigator(
//   {
//     Login: {screen: Index},
//     WebView: {screen: WebView},
//     Home: {screen: Home},
//     Authorization: {screen: Authorization},
//   },
//   {
//     initialRouteName: 'Login',
//     headerMode: 'none',
//   },
// );
const RootStackScreen = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal" headerMode="none">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen name="MyModal" component={ModalScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default MainStackScreen;
// const RootStack = createStackNavigator(
//   {
//     Main: {
//       screen: MainStack,
//     },
//     MyModal: {
//       screen: ModalScreen,
//     },
//   },
//   {
//     initialRouteName: 'Main',
//     mode: 'modal',
//     headerMode: 'none',
//   },
// );

// const AppContainer = NavigationContainer(RootStackScreen);
// export default createAppContainer(MainStack);

// export default class App extends React.Component {
//   render() {
//     return <RootStackScreen />;
//   }
// }
