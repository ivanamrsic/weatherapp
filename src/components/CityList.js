import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import * as CityUtil from '../utils/CityData';
import CityListItemContainer from '../containers/CityListItemContainer';

class CityList extends Component {
  render() {
    return (
      <View style={style.list}>
        <FlatList
          data={CityUtil.cityList}
          renderItem={({ item }) => <CityListItemContainer city={item} />}
        />
      </View>
    );
  }
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
