import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import { stringify } from "simple-query-string";
import { StackActions, NavigationActions } from 'react-navigation';
import { payload_authorization_code } from "./utils/payloads"
import { request, handleAccessToken } from "./utils";
import WrapperConsumer, { ActionTypes } from "./store/index";

const isLogin = async (navigation, context, code) => {
  let { data } = payload_authorization_code
  data = { ...data, code }
  payload_authorization_code.data = stringify(data)

  const res = await request(payload_authorization_code)
  if (res.status === 200) {
    const tokens = await handleAccessToken(res.data, context)
    if (tokens) {
      const { dispatch } = context;
      await dispatch({ type: ActionTypes.ADD_AUTHORIZATION, text: tokens });

      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Home' })],
      });
      navigation.dispatch(resetAction);
    }
    console.log("isLogin logouttttttt");
  }
}

const Authorization = ({ navigation, context }) => {
  const code = navigation.getParam("code")
  isLogin(navigation, context, code);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 20 }}>HAY austidadakjs dkaj dka skndaknjs </Text>
    </SafeAreaView>
  )

}
export default WrapperConsumer(Authorization)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    justifyContent: "flex-end",
  }
});
