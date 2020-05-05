import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';

import {stringify} from 'simple-query-string';
// import { StackActions, NavigationActions } from 'react-navigation';
import {
  payload_authorization_code,
  payload_GetMembershipsById,
} from './utils/payloads';
import {request, handleAccessToken, GetMembershipData} from './utils';
import WrapperConsumer, {ActionTypes} from './store/index';

//get authorization code
const isLogin = async (navigation, context, code) => {
  console.log('isLogin');
  let payload = JSON.parse(payload_authorization_code);
  let {data} = payload;
  data = {...data, code};

  payload.data = stringify(data);
  const res = await request(payload);
  if (res.status === 200) {
    const tokens = await handleAccessToken(res.data, context);
    if (tokens) {
      const {dispatch} = context;
      const {bungieMembershipId, accessToken} = tokens;
      // console.log('bungieMembershipId', bungieMembershipId, value)
      const resMembershipData = await GetMembershipData(
        accessToken,
        bungieMembershipId,
      );
      if (!resMembershipData.bungieNetUser.displayName) {
        console.log('isLogin logouttttttt');
        return false;
      }
      const {destinyMemberships, bungieNetUser} = resMembershipData;
      await dispatch({type: ActionTypes.ADD_AUTHORIZATION, text: tokens});
      await dispatch({
        type: ActionTypes.ADD_MEMBERSHIPS,
        text: {accountSelected: '1', destinyMemberships},
      });
      await dispatch({
        type: ActionTypes.ADD_BUNGIENETUSER,
        text: bungieNetUser,
      });

      // const resetAction = StackActions.reset({
      //   index: 0,
      //   actions: [NavigationActions.navigate({ routeName: 'Home' })],
      // });
      // navigation.dispatch(resetAction);
      navigation.replace('Home');
    }
    // console.log("isLogin logouttttttt");
  }
};

const Authorization = ({route, navigation, context}) => {
  console.log('Authorization', navigation);
  const {code} = route.params;
  if (context.authorization && !context.authorization.status) {
    isLogin(navigation, context, code);
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 20}}>HAY austidadakjs dkaj dka skndaknjs </Text>
    </SafeAreaView>
  );
};
export default WrapperConsumer(Authorization);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'flex-end',
  },
});
