import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Button,
  Image,
  View,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
const {width} = Dimensions.get('window');

const widthScreen = width;
const _GetImageSize = async ({uri}, setHeight) => {
  if (setHeight) {
    await Image.getSize(uri, (width, height) =>
      setHeight(height / (width / widthScreen)),
    );
  }
};
const ModalScreen = ({route, navigation}) => {
  const {item} = route.params;
  const {
    screenshot,
    displayProperties,
    itemTypeDisplayName,
    instances,
    defaultDamageType: {displayProperties: Damage_displayProperties},
  } = item;
  const screenshotUri = {uri: `https://www.bungie.net${screenshot}`};
  let {icon, name, description} = displayProperties;
  icon = {uri: `https://www.bungie.net${icon}`};
  let typeDamageIcon = null;
  if (Damage_displayProperties) {
    typeDamageIcon = {
      uri: `https://www.bungie.net${Damage_displayProperties.icon}`,
    };
  }
  const [height, setHeight] = useState(0);
  useEffect(() => {
    async function fetchData() {
      if (!height) {
        await _GetImageSize(screenshotUri, setHeight);
      }
    }
    fetchData();
  }, [height]);
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={screenshotUri}
        style={{
          width,
          height,
          resizeMode: 'contain',
          position: 'absolute',
          top: 0,
          zIndex: 0,
        }}
      />
      <View
        style={(styles.contentInfo, height > 0 ? {top: height - 115} : null)}>
        <Image source={icon} style={[styles.weapon]} />
        <Text style={styles.nameWeapon}>{name}</Text>
        <Text style={styles.tyoeWeapon}>{itemTypeDisplayName}</Text>
        <Text style={styles.descriptionWeapon}>{description}</Text>
        {typeDamageIcon && (
          <View style={styles.contentDamage}>
            <Image source={typeDamageIcon} style={[styles.damage]} />
            <Text style={styles.nameWeapon}>{instances.primaryStat.value}</Text>
          </View>
        )}
        <Button onPress={() => navigation.goBack()} title="Dismiss" />
      </View>
    </SafeAreaView>
  );
};
export default ModalScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424',
  },
  contentInfo: {
    paddingHorizontal: 20,
  },
  nameWeapon: {
    paddingTop: 5,
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
  },
  contentDamage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#585858',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginVertical: 15,
    paddingVertical: 12,
  },
  damage: {
    marginRight: 10,
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  descriptionWeapon: {
    fontSize: 14,
    paddingVertical: 5,
    color: '#fff',
  },
  tyoeWeapon: {
    fontSize: 20,
    color: '#fff',
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
