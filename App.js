
import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { ContextStore } from "./app/store/index";
import Router from "./app/router/index";

const App = () => {

  return (
    <ContextStore component={<View style={styles.container}>
      <Router />
    </View>} />

  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
    justifyContent: "flex-end",
  }
});
export default App