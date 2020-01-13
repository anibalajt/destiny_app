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
  let { icon, name } = displayProperties;
  // if (inventory.bucketTypeHash === 3284755031) {
  //   icon = '';
  //   // icon = require(u);
  // } else {
  icon = { uri: `https://www.bungie.net${icon}` };
  // }
  return (
    <Fragment>
      <Image
        source={icon}
        style={[styles.weapon]}
      />
      {/* <Text>{name}</Text> */}
    </Fragment>

  )
}

export default (Item)
const styles = StyleSheet.create({
  weapon: {
    borderColor: "#fff",
    borderWidth: 2,
    zIndex: 0,
    // flex: 1,
    width: 65,
    height: 65,
    resizeMode: "contain"
  },
});

