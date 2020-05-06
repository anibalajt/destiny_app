import React, {Fragment} from 'react';
import {StyleSheet, View, Dimensions, TouchableHighlight} from 'react-native';

const {width} = Dimensions.get('window');
import Emblem from './emblem';
import Vault from './vault';
const underlayColor = '#272C30';
const Footer = ({
  characterSelect = null,
  characters = [],
  vault = false,
  menubar = false,
  dispatch,
  onChangeCharacter,
  context,
  navigation,
}) => {
  return (
    <View style={[styles.container]}>
      <View
        style={[
          styles.characters,
          Object.keys(characters).length > 1 && {
            justifyContent: 'space-between',
          },
        ]}>
        {Object.keys(characters).map((character, key) => (
          <TouchableHighlight
            key={key}
            underlayColor={underlayColor}
            style={[
              characterSelect == characters[character].characterId &&
                !vault && {
                  backgroundColor: underlayColor,
                },
            ]}
            onPress={e =>
              onChangeCharacter(context, characters[character].characterId)
            }>
            <Fragment>
              <Emblem character={characters[character]} />
            </Fragment>
          </TouchableHighlight>
        ))}
        <TouchableHighlight
          underlayColor={underlayColor}
          style={[
            vault && {
              backgroundColor: underlayColor,
            },
          ]}
          onPress={e => onChangeCharacter(context, 'vault')}>
          <Vault />
        </TouchableHighlight>
      </View>
      <TouchableHighlight
        underlayColor={underlayColor}
        style={[
          {
            width: 80,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          },
          menubar && {
            backgroundColor: underlayColor,
          },
        ]}
        onPress={e => navigation.navigate('Profile')}>
        <Fragment>
          <View style={[styles.line]} />
          <View style={[styles.line]} />
          <View style={[styles.line]} />
        </Fragment>
      </TouchableHighlight>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    elevation: 3,
    width,
    backgroundColor: '#12171c',
    height: 65,
    flexDirection: 'row',
  },
  line: {
    backgroundColor: '#fff',
    width: 35,
    height: 4,
    marginVertical: 4,
    borderRadius: 3,
  },
  characters: {
    flex: 1,
    width: width - 100,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
});
// onChangeCharacter(
//   !characterSelect && !vault
//     ? 'vault'
//     : characterSelect && !vault && menubar
//     ? characterSelect
//     : 'menubar',
// )
