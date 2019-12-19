import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { hasTokenExpired, refreshToken } from "./utils/index"
import WrapperConsumer, { } from "./store/index";
import { StackActions, NavigationActions } from 'react-navigation';
import Login from "./login/index"

const isLogin = async (navigation) => {
  // console.log('ISLOGIN index')
  try {
    let authorization = await AsyncStorage.getItem("authorization");
    if (authorization) {
      authorization = JSON.parse(authorization);
      const tokenExpired = await hasTokenExpired(authorization.accessToken);
      if (tokenExpired) {
        const refresh = await refreshToken(authorization.refreshToken);
        if (refresh) {
          return 'Home'
        }
      }
      if (!tokenExpired) {
        return 'Home'
      }
    }
  } catch (error) {
    console.log("error :", error);
    return 'Login'
  }
  return 'Login'
}

const Index = ({ navigation, context }) => {
  // AsyncStorage.removeItem("authorization");
  const [login, setLogin] = useState('');
  const { authorization, dispatch } = context;
  console.log('index :', authorization);
  useEffect(() => {

    async function fetchData() {
      const response = await isLogin(navigation);
      if (response) {
        setLogin(response)
        if (login === 'Home') {
          console.log('redirect in index')
          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home' })],
          });
          navigation.dispatch(resetAction);
        }
      }
    }
    fetchData();
  }, [login])
  // console.log('login :', login);
  switch (login) {
    case 'Login':
      return (
        <Login navigation={navigation} />
      )
    default:
      return (
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <Text style={{ fontSize: 50 }}>CARGANDOOOO </Text>
        </View>
      )
  }


}
export default WrapperConsumer(Index)