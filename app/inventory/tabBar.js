import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

class TabBar extends React.Component {
  render() {
    const { activeTab } = this.props;
    return (
      <View style={[styles.tabs, this.props.style]}>
        {this.props.tabs.map((tab, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => this.props.goToPage(i)}
              style={styles.tab}
            >
              <Text
                style={[styles.text, activeTab === i && { color: "#f5dc56" }]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontSize: 14
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  tabs: {
    height: 40,
    paddingVertical: 10,
    backgroundColor: "#272C30",
    flexDirection: "row",
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: "rgba(0,0,0,0.05)"
  }
});

export default TabBar;
