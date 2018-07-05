import React, { Component } from 'react';
import { FlatList } from 'react-native';
import * as weatherData from '../service/weatherData';
import ForecastListItem from './ForecastListItem';

class ForecastList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forecastByDaysList: [],
    };
  }

  componentDidMount() {
    weatherData.fetchWeatherForcastForCity('Zagreb', this.fetchWeather.bind(this));
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
