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
    mainWeapons: {},
    mainArmor: {},
    mainMisc: {},
    weapons: {},
    armor: {},
    misc: {},
  }
  componentDidMount() {
    const { character_equipment } = this.props
    equipment(character_equipment, this)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.character_selected !== this.props.character_selected) {
      this.setState({
        mainWeapons: {},
        mainArmor: {},
        mainMisc: {},
        weapons: {},
        armor: {},
        misc: {},
      })
      const { character_equipment } = this.props
      equipment(character_equipment, this)
    }
  }
  render() {
    const { mainWeapons, mainArmor, mainMisc, weapons, armor, misc } = this.state
    // console.log('mainWeapons', mainWeapons)
    return (
      <ScrollableTabView prerenderingSiblingsNumber={2}
        style={{ backgroundColor: '#242424' }}
        tabBarPosition="top"
        renderTabBar={() => <TabBar />}>
        <Set tabLabel="WEAPONS" type="weapons" equipment={mainWeapons} other_equipment={weapons} />
        <Set tabLabel="ARMOR" type="armor" equipment={mainArmor} other_equipment={armor} />
        <Set tabLabel="GENERAL" type="general" equipment={mainMisc} other_equipment={misc} />
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
