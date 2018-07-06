import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import ForecastListItem from './ForecastListItem';
import * as weatherService from '../services/weather';

class ForecastList extends Component {
  static propTypes = {
    city: PropTypes.object,
    weatherReport: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      forecastByDaysList: [],
    };
  }

  componentDidMount() {
    weatherService.fetchWeatherForcastForCity('Zagreb', this.fetchWeather);
  }

  @autobind
  fetchWeather(weather) {
    this.setState({
      forecastByDaysList: weather,
    });
  }

  renderItem = ({ item, index }) => <ForecastListItem forecast={item} key={`${index}`} />;

  render() {
    const { forecastByDaysList } = this.state;
    const {
      city: { value },
      weatherReport: { description, temp },
    } = this.props;
    return (
      <View style={style.screen}>
        <View style={style.currentInformation}>
          <Text style={style.cityName}>
            {value}
          </Text>
          <Text style={style.weatherDescription}>
            {description}
          </Text>
          <Text style={style.currentTemperature}>
            {temp}
          </Text>
        </View>
        <FlatList data={forecastByDaysList} renderItem={this.renderItem} />
      </View>
    );
  }
}

const style = StyleSheet.create({
  cityName: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
  },
  weatherDescription: {
    fontSize: 18,
    paddingTop: 5,
    color: 'white',
  },
  currentInformation: {
    flex: 0.7,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentTemperature: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  screen: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default ForecastList;
