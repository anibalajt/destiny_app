import React, { Component, Fragment, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView
} from "react-native";
import TabBar from "./tabBar"
import ScrollableTabView from "react-native-scrollable-tab-view";
import WrapperConsumer, { ActionTypes } from "../store/index";
import { request } from "../utils/index"

import { payload_GetAccountDate } from "../utils/payloads"


const inventory = ({ context }) => {
  // console.log('authorization 2', context)
  return (
    <ScrollableTabView
      style={{ backgroundColor: '#242424' }}
      tabBarPosition="top"
      renderTabBar={() => <TabBar />}>
      <View tabLabel="WEAPONS">
        <Text>
          home
          </Text>
      </View>
      <View tabLabel="ARMOR">
        <Text>
          profile
          </Text>
      </View>
      <View tabLabel="GENERAL">
        <Text>
          settings
          </Text>
      </View>
      <View tabLabel="INVENTORY">
        <Text>
          settings
          </Text>
      </View>
    </ScrollableTabView>

  )

}
export default WrapperConsumer(inventory)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#272C30",
    // justifyContent: "flex-end",
  }
});
