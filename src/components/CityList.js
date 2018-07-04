import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import * as cityData from '../service/cityData';
import CityListItem from './CityListItem';

function CityList() {
  return (
    <View style={style.list}>
      <FlatList data={cityData.cityList} renderItem={({ item }) => <CityListItem city={item} />} />
    </View>
  );
}

const style = StyleSheet.create({
  list: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#4286f4',
  },
});

export default CityList;
