import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import emblemDefinition from "../utils/emblemDefinition"
export default ({ character }) => {
  const { emblemPath } = character;
  const [typeClass, setTypeClass] = useState('')
  useEffect(() => {
    if (typeClass === '') {
      emblemDefinition(character, setTypeClass);
    }
  }, [typeClass])

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://www.bungie.net${emblemPath}` }}
        style={{ resizeMode: "contain", width: 40, height: 40 }}
      />
      <Text style={styles.text}>{typeClass}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10
  },
  text: {
    color: "#fff",
    fontSize: 12
  }
});
