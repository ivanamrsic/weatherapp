import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import * as WeatherDataUtil from '../utils/WeatherDataUtil';

const CityListItem = props => {
  const weather = props.weatherReport.weather[0];

  return (
    <View style={style.citySection}>
      <TouchableOpacity onPress={props.onPress}>
        <View>
          <Text style={style.cityName}>{props.city.value}</Text>
        </View>
      </TouchableOpacity>

      {!props.isLoading ? (
        <View style={style.cityInfo}>
          <Image
            style={{ width: 50, height: 50 }}
            source={{
              uri: 'https://openweathermap.org/img/w/' + weather.icon + '.png',
            }}
          />

          <Text style={style.infoText}>{weather.main}</Text>

          <View>
            <Text style={style.infoText}>
              min:{' '}
              {WeatherDataUtil.convertKelvinToCelsius(
                props.weatherReport.main.temp_min
              )}
            </Text>
            <Text style={style.infoText}>
              max:{' '}
              {WeatherDataUtil.convertKelvinToCelsius(
                props.weatherReport.main.temp_max
              )}
            </Text>
          </View>
        </View>
      ) : (
        <View>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  citySection: {
    flex: 1,
    flexDirection: 'row',
  },
  cityName: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
    padding: 10,
  },
  cityInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    color: 'white',
  },
  infoText: {
    color: 'white',
  },
});

export default CityListItem;
