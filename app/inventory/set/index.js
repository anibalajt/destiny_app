import React, { } from "react";
import {
  Text,
  StyleSheet,
  View,
} from "react-native";
import Item from "../item"

export default ({ type, equipment }) => {
  // console.log(type, equipment.length)
  return (
    <View style={styles.container}>
      <Text>{type}</Text>
      {/* <View style={styles.contentEquip}> */}
      {equipment && equipment.map((obj) =>
        <Item key={obj.index} item={obj} />
      )}
      {/* </View> */}
    </View >

  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "flex-end",
  },
  contentEquip: {
    flex: 1,
    marginHorizontal: 15,
    flexDirection: "row",
    flexWrap: "wrap"
  },
});
