import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { token } from "./utils";
import { StackActions, NavigationActions } from 'react-navigation';

import WrapperConsumer, { ActionTypes } from "./store/index";

const isLogin = async (navigation, context, code) => {
  if (code) {
    console.log('cod\e', code)
    const t = await token(code, navigation);
    console.log('t', t)
    if (t.status) {
      const { authorization, dispatch } = context;
      // if (!authorization.accessToken) {
      dispatch({ type: ActionTypes.ADD_AUTHORIZATION, text: t.tokens });
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Home' })],
      });
      navigation.dispatch(resetAction);
      // }

    }
  } else {
    console.log("logouttttttt");
  }
};

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
