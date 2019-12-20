import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import { stringify } from "simple-query-string";

import { payload_refresh_token } from "./utils/payloads"
import { hasTokenExpired, request, handleAccessToken } from "./utils/index"
import WrapperConsumer, { ActionTypes } from "./store/index";
import Login from "./login/index"

const isLogin = async (context) => {
  // console.log('ISLOGIN index')
  const { dispatch } = context;

  // try {
  let authorization = await AsyncStorage.getItem("authorization");
  if (authorization) {
    console.log(authorization)
    authorization = JSON.parse(authorization);
    const tokenExpired = true// await hasTokenExpired(authorization, context);
    //Token Expired
    if (tokenExpired) {

      let { data } = payload_refresh_token
      data = { ...data, refresh_token: authorization.refreshToken.value }
      payload_refresh_token.data = stringify(data)

      return request(payload_refresh_token).then(async (res) => {
        console.log('res', res)
        if (res.status === 200) {
          return handleAccessToken(res.data).then(tokens => {
            if (tokens) {
              const { dispatch } = context;
              dispatch({ type: ActionTypes.ADD_AUTHORIZATION, text: tokens });
              return 'Home'
            }
            console.log('isLogin tokens', tokens)
          })
        }
      })

    }
    if (!tokenExpired) {
      await dispatch({ type: ActionTypes.ADD_AUTHORIZATION, text: authorization });
      return 'Home'
    }
  }
  // } catch (error) {
  //   console.log("isLogin error :", error);
  //   return 'Login'
  // }
  return 'Login'
}

const Index = ({ navigation, context }) => {
  // AsyncStorage.removeItem("authorization");
  const [login, setLogin] = useState('');
  useEffect(() => {
    async function fetchData() {
      const response = await isLogin(context);
      if (response) {
        setLogin(response)
        console.log('response, login', response, login)
        if (response === 'Home') {
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