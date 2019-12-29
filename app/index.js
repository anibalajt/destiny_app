import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import { stringify } from "simple-query-string";

import { payload_refresh_token } from "./utils/payloads"
import { hasTokenExpired, request, handleAccessToken, GetMembershipData, getManifest } from "./utils/index"
import WrapperConsumer, { ActionTypes } from "./store/index";
import Login from "./login/index"

//see if there is a login and token expired
const isLogin = async (context) => {
  const { dispatch } = context;
  try {
    let authorization = await AsyncStorage.getItem("authorization");
    if (authorization) {
      authorization = JSON.parse(authorization);
      const tokenExpired = await hasTokenExpired(authorization, context);
      //Token Expired
      if (tokenExpired) {
        let payload = JSON.parse(payload_refresh_token)
        let { data } = payload
        data = { ...data, refresh_token: authorization.refreshToken.value }
        payload.data = stringify(data)

        return request(payload).then(async (res) => {
          // console.log('res', res)
          if (res.status === 200) {
            return handleAccessToken(res.data).then(tokens => {
              if (tokens) {
                const { dispatch } = context;
                dispatch({ type: ActionTypes.ADD_AUTHORIZATION, text: tokens });
                return { router: 'Home', tokens }
              }
              console.log('isLogin tokens', tokens)
            })
          }
        })
      }
      if (!tokenExpired) {
        await dispatch({ type: ActionTypes.ADD_AUTHORIZATION, text: authorization });
        return { router: 'Home', tokens: authorization }
      }
    }
  } catch (error) {
    console.log("isLogin error :", error);
    return { router: 'Login' }
  }
  return { router: 'Login' }
}

const goHome = async (navigation, context) => {
  const { dispatch, authorization } = context;
  const accountSelected = await AsyncStorage.getItem("accountSelected");
  if (!accountSelected) {
    await AsyncStorage.setItem("accountSelected", '1');
  }
  const { bungieMembershipId, accessToken } = authorization
  const resMembershipData = await GetMembershipData(accessToken, bungieMembershipId)
  if (!resMembershipData.bungieNetUser.displayName) {
    console.log("goHome logouttttttt");
    return false
  }
  const responseManifest = await getManifest()

  const { destinyMemberships, bungieNetUser } = resMembershipData
  await dispatch({
    type: ActionTypes.ADD_MEMBERSHIPS, text: {
      accountSelected: accountSelected ? accountSelected : '1', destinyMemberships
    }
  });
  await dispatch({ type: ActionTypes.ADD_BUNGIENETUSER, text: bungieNetUser });

  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
  });
  navigation.dispatch(resetAction);
}
const Index = ({ navigation, context }) => {
  // AsyncStorage.removeItem("authorization");
  const [login, setLogin] = useState('');
  useEffect(() => {
    async function fetchData() {
      if (login === '') {
        const response = await isLogin(context);
        if (response.router) {
          setLogin(response.router)
          if (response === 'Home') {
            goHome(navigation, { dispatch: context.dispatch, authorization: response.tokens })
          }
        }
      }
    }

    if (!context.authorization.status) {
      fetchData();
    } else {
      goHome(navigation, context)
    }
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