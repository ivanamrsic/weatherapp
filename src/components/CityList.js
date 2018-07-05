import React, { Component } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import * as city from '../services/city';
import CityListItem from './CityListItem';

class CityList extends Component {
  renderItem = ({ item }) => <CityListItem city={item} />;

  render() {
    return (
      <View style={style.list}>
        <FlatList data={city.cityList} renderItem={this.renderItem} />
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
