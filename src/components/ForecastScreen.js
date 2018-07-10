import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { autobind } from 'core-decorators';
import PropTypes from 'prop-types';
import ForecastListItem from './ForecastListItem';
import * as weatherService from '../services/weather';
import * as navigationService from '../services/navigation';

class ForecastScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const navigationParams = navigationService.getParams(navigation);

    this.state = {
      forecastByDaysList: [],
      navigationParams,
    };
  }

  componentDidMount() {
    const { navigationParams } = this.state;
    const {
      city: { value },
    } = navigationParams;

    weatherService.fetchWeatherForcastForCity(value, this.fetchWeather);
  }

  @autobind
  fetchWeather(weather) {
    this.setState({
      forecastByDaysList: weather,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  renderItem({ item }) {
    return <ForecastListItem forecast={item} key={item.date} />;
  }

  render() {
    const { forecastByDaysList, navigationParams } = this.state;
    const {
      city: { value },
      weatherReport: { description, temp },
    } = navigationParams;

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

export default ForecastScreen;
