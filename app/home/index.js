import React, { Component, Fragment, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView
} from "react-native";
import Footer from "../footer"
import WrapperConsumer, { ActionTypes } from "../store/index";
import { request } from "../utils/index"
import Inventory from "../inventory"
import { payload_GetAccountDate } from "../utils/payloads"

const getAccountDate = async (context) => {
  const { authorization: { accessToken }, memberships: { accountSelected, destinyMemberships } } = context;
  const { membershipType, membershipId } = destinyMemberships[accountSelected]
  // console.log('destinyMemberships[accountSelected]', destinyMemberships[accountSelected])
  const payload = payload_GetAccountDate(accessToken, membershipType, membershipId)
  const res = await request(JSON.parse(payload))
  console.log('res', res)

  const {
    profileInventory: { data: { items } },
    profile,
    characters,
    itemComponents,
    characterEquipment,
    characterInventories
  } = res.data.Response;
  const vault = items.filter((item) => {
    return item.itemInstanceId
  });
  const characterSelect = Object.keys(characters.data)[0];
  const data = {
    instances: itemComponents.instances.data,
    inventoriesVault: vault,
    profile: profile.data,
    characterIds: profile.data.characterIds,
    characters,
    characterSelect,
    characterInventories,
    inventories: characterInventories.data[characterSelect].items,
    characterEquipment: characterEquipment.data,
    equipment: characterEquipment.data[characterSelect]
  }
  const { dispatch } = context;
  await dispatch({ type: ActionTypes.ADD_CHARACTERS, text: characters.data });
  await dispatch({ type: ActionTypes.ADD_CHARACTERS_SELECTED, text: characterSelect });

}

const Home = ({ context }) => {
  const { character_selected, characters } = context;
  // console.log('characterSelect', character_selected)
  if (!character_selected) {
    getAccountDate(context)
  }
  return (
    <SafeAreaView style={styles.container}>
      {
        character_selected ?
          <Fragment>
            <Inventory />
            <Footer characterSelect={character_selected} characters={characters} />
          </Fragment>
          : null
      }

    </SafeAreaView>
  )

}
export default WrapperConsumer(Home)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#272C30",
    // justifyContent: "flex-end",
  }
});
