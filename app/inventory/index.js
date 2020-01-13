import React, { Component, Fragment, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView
} from "react-native";
import TabBar from "./tabBar"
import ScrollableTabView from "react-native-scrollable-tab-view";
import Set from "./set/index"
import equipment from "../inventory/equipment"


class inventory extends Component {
  state = {
    weapons: [],
    armor: [],
    misc: [],
  }
  componentDidMount() {
    const { character_equipment } = this.props
    equipment(character_equipment, this)
  }
  render() {
    const { weapons, armor, misc } = this.state
  
    return (
      <ScrollableTabView
        style={{ backgroundColor: '#242424' }}
        tabBarPosition="top"
        renderTabBar={() => <TabBar />}>
        <Set tabLabel="WEAPONS" type="weapons" equipment={weapons} />
        <Set tabLabel="ARMOR" type="armor" equipment={armor} />
        <Set tabLabel="GENERAL" type="general" equipment={misc} />
        <Set tabLabel="INVENTORY" type="inventory" />
      </ScrollableTabView>

    )
  }
}

export default (inventory)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#272C30",
    // justifyContent: "flex-end",
  }
});
