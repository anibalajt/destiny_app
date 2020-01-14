import React, { Component, Fragment, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image
} from "react-native";



const Item = ({ item }) => {
  const {
    displayProperties,
    equippingBlock,
    itemType,
    instances,
    defaultDamageTypeHash,
    bucketHash,
    inventory,
    hash
  } = item;
  // console.log('equippingBlock', item)
  let { icon, name } = displayProperties;
  // if (inventory.bucketTypeHash === 3284755031) {
  //   icon = '';
  //   // icon = require(u);
  // } else {
  icon = { uri: `https://www.bungie.net${icon}` };
  // }
  return (
    <View style={styles.container}>
      <Image
        source={icon}
        style={[styles.weapon]}
      />
      {/* <Text>{name}</Text> */}
    </View>

  )
}

export default (Item)
const styles = StyleSheet.create({
  container: {
    width: 65,
    height: 65,
    marginLeft: 8,
    // marginBottom: 8
  },
  weapon: {
    borderColor: "#fff",
    borderWidth: 2,
    zIndex: 0,
    width: 65,
    height: 65,
    resizeMode: "contain"
  },
});

