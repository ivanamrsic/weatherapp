import React, { Component } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { autobind } from 'core-decorators';
import PropTypes from 'prop-types';
import * as cityService from '../services/city';
import CityListItem from './CityListItem';

class CityList extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  @autobind
  renderItem({ item: city }) {
    const { navigation } = this.props;
    return <CityListItem city={city} navigation={navigation} key={city.value} />;
  }

  render() {
    return (
      <View style={style.list}>
        <FlatList data={cityService.cityList} renderItem={this.renderItem} />
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
