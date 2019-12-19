import React, { Component, Fragment, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView
} from "react-native";
import WrapperConsumer, { ActionTypes } from "../store/index";

const Home = ({ context }) => {
  const { authorization, dispatch } = context;
  console.log('authorization 2', authorization)
  
  return (
    <SafeAreaView style={styles.container}>
      <Text>HAY LOGIN </Text>
    </SafeAreaView>
  )

}
export default WrapperConsumer(Home)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    // justifyContent: "flex-end",
  }
});
