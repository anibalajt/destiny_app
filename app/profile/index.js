import React, { Component, Fragment, useState, useEffect } from "react";
import {
  Dimensions,
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableHighlight
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';

const { height, width } = Dimensions.get("window");
import { request, endpoints, statusBarHeight, membershipType } from "../utils";
import { payload_GetMembershipsById } from "../utils/payloads"
import WrapperConsumer, { ActionTypes } from "../store/index";

// GetMembershipData = async (token, bungieMembershipId, context) => {
//   const payload = payload_GetMembershipsById(token, bungieMembershipId)
//   const res = await request(payload)
//   if (res.status === 200 && res.data.Response) {
//     const { destinyMemberships, bungieNetUser } = res.data.Response;
//     const { dispatch } = context;
//     await dispatch({ type: ActionTypes.ADD_MEMBERSHIPS, text: destinyMemberships });
//     await dispatch({ type: ActionTypes.ADD_BUNGIENETUSER, text: bungieNetUser });
//   }
// };
const logout = async (navigation, context) => {
  const { dispatch } = context;
  AsyncStorage.removeItem("authorization");
  AsyncStorage.removeItem("accountSelected");
  await dispatch({ type: ActionTypes.LOGOUT });
  // const resetAction = StackActions.reset({
  //   index: 0,
  //   actions: [NavigationActions.navigate({ routeName: 'Login' })],
  // });
  // navigation.dispatch(resetAction);
  navigation.replace({ routeName: 'Home' })

}
const Profile = ({ navigation, context }) => {
  const { memberships: { accountSelected, destinyMemberships }, bungieNetUser: { profileThemeName, profilePicturePath, displayName }
  } = context;
  const barheight = statusBarHeight()
  let membershipTypeID = null
  if (destinyMemberships) {
    membershipTypeID = destinyMemberships[accountSelected].membershipType
  }
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.cover}
        source={{
          uri: endpoints.userThemes(profileThemeName)
        }}
      />
      <View style={styles.coverShadow} />
      <View style={[styles.contentInfoProfile, { marginTop: (barheight > 24) ? -barheight : 0, }]}>
        <Image
          style={styles.imgProfile}
          source={{
            uri: `${endpoints.assets}${profilePicturePath}`
          }}
        />
        <View
          style={{
            height: 50,
            flex: 1,
            marginTop: 30,
          }}
        >
          <Text style={styles.displayName}>{displayName}</Text>
          {membershipTypeID ?
            <Text style={{ color: "#fff", fontSize: 14 }}>
              {membershipType(membershipTypeID).name}
            </Text> : null
          }
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.fontMenu}>Switch Account</Text>
        {
          destinyMemberships && destinyMemberships.map((Memberships, index) =>
            <Text key={index} style={styles.fontSubMenu}>
              {membershipType(Memberships.membershipType).name}
            </Text>
          )
        }
        <TouchableHighlight onPress={() => logout(navigation, context)}>
          <Text style={styles.fontMenu}>
            Log out
          </Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  )
}
export default WrapperConsumer(Profile)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424'
  },
  fontMenu: {
    fontSize: 16,
    color: '#fff',
    paddingVertical: 10,
  },
  fontSubMenu: {
    paddingLeft: 10,
    fontSize: 14,
    color: '#fff',
    paddingVertical: 7,
  },
  cover: {
    position: 'absolute',
    top: 0,
    zIndex: 0,
    width,
    resizeMode: 'cover',
    height: 130
  },
  imgProfile: {
    marginTop: 30,
    marginRight: 10,
    height: 50,
    width: 50,
    resizeMode: 'contain'
  },
  displayName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  contentInfoProfile: {
    width,
    height: 130,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 10
  },
  coverShadow: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#00000075',
    zIndex: 0,
    width,
    height: 120
  },
  body: {
    padding: 15
  }
});
