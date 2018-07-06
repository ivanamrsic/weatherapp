import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import * as weatherService from '../services/weather';

function ForecastListItem(props) {
  const {
    forecast: { icon, description, date },
  } = props;
  return (
    <View style={style.itemList}>
      <Text style={style.dayName}>
        {weatherService.getDayNameFromDate(date)}
      </Text>
      <Text>
        {` ${description}`}
      </Text>
      <Image
        style={style.weatherIcon}
        source={{
          uri: weatherService.getIconURL(icon),
        }}
      />
    </View>
  );
}

ForecastListItem.propTypes = {
  forecast: PropTypes.object,
};

const style = StyleSheet.create({
  weatherIcon: {
    width: 40,
    height: 40,
  },
  itemList: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#495972',
    borderWidth: 0.5,
    padding: 10,
    backgroundColor: '#4485ed',
  },
  dayName: {
    fontSize: 20,
    color: 'white',
  },
});

export default ForecastListItem;
