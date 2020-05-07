import React, {Fragment} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import Item from '../item';
import {typeBucketHash} from '../../utils';

const getInfoBucketDefinition = () => {};
export default ({openModal, type, equipment, other_equipment}) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {other_equipment &&
          typeBucketHash[type].map((slot, index) => (
            <Fragment key={'F_' + index}>
              <Text style={styles.subTitle}>
                {equipment[slot] &&
                  equipment[slot].bucketDefinition &&
                  equipment[slot].bucketDefinition.displayProperties.name}
              </Text>
              <View key={'s_' + index} style={styles.equippingBlock}>
                {equipment[slot] && (
                  <Item
                    openModal={openModal}
                    key={index}
                    item={equipment[slot]}
                  />
                )}
                <View style={styles.contentEquip}>
                  {other_equipment[slot] &&
                    other_equipment[slot].map((obj, index) => (
                      <Item openModal={openModal} key={index} item={obj} />
                    ))}
                </View>
              </View>
            </Fragment>
          ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "flex-end",
  },
  subTitle: {
    fontSize: 14,
    color: '#fff',
    textTransform: 'uppercase',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginVertical: 5,
    flex: 1,
    backgroundColor: '#272C30',
  },
  equippingBlock: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 10,
  },
  contentEquip: {
    flex: 1,
    marginHorizontal: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
