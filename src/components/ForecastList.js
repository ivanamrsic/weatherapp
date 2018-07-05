import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import ForecastListItem from './ForecastListItem';
import * as weatherService from '../services/weather';

class ForecastList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forecastByDaysList: [],
    };
  }

  componentDidMount() {
    weatherService.fetchWeatherForcastForCity('Zagreb', this.fetchWeather.bind(this));
  }

  fetchWeather(weather) {
    this.setState({
      forecastByDaysList: weather,
    });
  }

  renderItem = ({ item }) => <ForecastListItem forecast={item} />;

  render() {
    const { forecastByDaysList } = this.state;

    return <FlatList data={forecastByDaysList} renderItem={this.renderItem} />;
  }
}

export default ForecastList;
