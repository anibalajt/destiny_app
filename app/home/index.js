import React, {Component, Fragment, useState, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View, SafeAreaView} from 'react-native';
import Footer from '../footer';
import WrapperConsumer, {ActionTypes} from '../store/index';
import {request} from '../utils/index';
import Inventory from '../inventory';
import {payload_GetAccountDate} from '../utils/payloads';
import setEquitpment from '../inventory/equipment';

const onChangeCharacter = async (context, characterId) => {
  const {
    dispatch,
    data_account: {characterEquipment, characterInventories, instances},
  } = context;
  switch (characterId) {
    case 'vault':
      break;
    case 'profile':
      // navigation.navigate('MyModal', {item});

      break;
    default:
      await dispatch({
        type: ActionTypes.ADD_EQUIPMENT,
        text: {
          equipment: characterEquipment[characterId].items,
          other_equipment: characterInventories[characterId].items,
          instances: instances,
        },
      });
      await dispatch({
        type: ActionTypes.ADD_CHARACTERS_SELECTED,
        text: characterId,
      });
      break;
  }
};

const getAccountDate = async context => {
  const {
    authorization: {accessToken},
    memberships: {accountSelected, destinyMemberships},
  } = context;
  const {membershipType, membershipId} = destinyMemberships[accountSelected];
  // console.log('destinyMemberships[accountSelected]', destinyMemberships[accountSelected])
  const payload = payload_GetAccountDate(
    accessToken,
    membershipType,
    membershipId,
  );
  const res = await request(JSON.parse(payload));
  const {
    profileInventory: {
      data: {items},
    },
    profile,
    characters,
    itemComponents,
    characterEquipment,
    characterInventories,
  } = res.data.Response;
  const vault = items.filter(item => {
    return item.itemInstanceId;
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
    equipment: characterEquipment.data[characterSelect],
    inventories: characterInventories.data[characterSelect].items,
    characterEquipment: characterEquipment.data,
  };
  const {dispatch} = context;
  await dispatch({
    type: ActionTypes.DATA_ACCOUNT,
    text: {
      characterEquipment: characterEquipment.data,
      characterInventories: characterInventories.data,
      instances: itemComponents.instances.data,
    },
  });
  await dispatch({
    type: ActionTypes.ADD_EQUIPMENT,
    text: {
      equipment: characterEquipment.data[characterSelect].items,
      other_equipment: characterInventories.data[characterSelect].items,
      instances: itemComponents.instances.data,
    },
  });
  await dispatch({type: ActionTypes.ADD_CHARACTERS, text: characters.data});
  await dispatch({
    type: ActionTypes.ADD_CHARACTERS_SELECTED,
    text: characterSelect,
  });
};

const Home = ({context, navigation}) => {
  const {
    character_selected,
    characters,
    dispatch,
    character_equipment,
  } = context;
  if (!character_selected) {
    getAccountDate(context);
  }
  return (
    <SafeAreaView style={styles.container}>
      {character_selected ? (
        <Fragment>
          <Inventory
            navigation={navigation}
            character_equipment={character_equipment}
            character_selected={character_selected}
          />
          <Footer
            onChangeCharacter={onChangeCharacter}
            context={context}
            vault={character_selected === 'vault' ? true : false}
            characterSelect={character_selected}
            characters={characters}
            dispatch={dispatch}
            navigation={navigation}
          />
        </Fragment>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#d0aa21" />
        </View>
      )}
    </SafeAreaView>
  );
};
export default WrapperConsumer(Home);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272C30',
    // justifyContent: "flex-end",
  },
});
