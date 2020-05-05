import React from 'react';
import {StyleSheet, View, Image, TouchableHighlight} from 'react-native';
import {convertHash} from '../../utils';
const DamageTypeDefinition = require('../../assets/DestinyDamageTypeDefinition.json');

const Item = ({item, navigation, openModal}) => {
  const {
    displayProperties,
    defaultDamageTypeHash,
    bucketHash,
    instances: {damageTypeHash},
  } = item;
  let {icon} = displayProperties;
  icon = {uri: `https://www.bungie.net${icon}`};
  if (defaultDamageTypeHash) {
    const idDamage = convertHash(
      damageTypeHash ? damageTypeHash : defaultDamageTypeHash,
    );
    let damage = DamageTypeDefinition.find(item => idDamage === item.id);
    damage = JSON.parse(damage.json);
    item.defaultDamageType = damage;
  }
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={() => openModal(item)}>
        <Image
          source={icon}
          style={[
            styles.weapon,
            bucketHash === 3284755031 ? {borderWidth: 0} : null,
          ]}
        />
      </TouchableHighlight>
      {/* <Text>{name}</Text> */}
    </View>
  );
};

export default Item;
const styles = StyleSheet.create({
  container: {
    width: 65,
    height: 65,
    marginLeft: 8,
    marginBottom: 8,
  },
  weapon: {
    borderColor: '#fff',
    borderWidth: 2,
    zIndex: 0,
    width: 65,
    height: 65,
    resizeMode: 'contain',
  },
});
