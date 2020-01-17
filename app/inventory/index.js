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
  openModal = (item) => {
    const { navigation } = this.props
    navigation.navigate('MyModal', { item })
  }
  render() {
    const { mainWeapons, mainArmor, mainMisc, weapons, armor, misc } = this.state
    return (
      <ScrollableTabView prerenderingSiblingsNumber={2}
        style={{ backgroundColor: '#242424' }}
        tabBarPosition="top"
        renderTabBar={() => <TabBar />}>
        {
          Object.keys(mainWeapons).length ?
            <Set openModal={this.openModal} tabLabel="WEAPONS" type="weapons" equipment={mainWeapons} other_equipment={weapons} />
            : <Text>Cargando</Text>
        }
        {
          Object.keys(mainArmor).length ?
            <Set openModal={this.openModal} tabLabel="ARMOR" type="armor" equipment={mainArmor} other_equipment={armor} />
            : <Text>Cargando</Text>
        }
        {
          Object.keys(mainMisc).length ?
            <Set openModal={this.openModal} tabLabel="GENERAL" type="general" equipment={mainMisc} other_equipment={misc} />
            : <Text>Cargando</Text>
        }
        {
          Object.keys(mainWeapons).length ?
            <Set openModal={this.openModal} tabLabel="INVENTORY" type="inventory" />
            : <Text>Cargando</Text>
        }
      </ScrollableTabView>

    )
  }
}

export default (inventory)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#272C30",
    // justifyContent: "flex-end",
  }
});
