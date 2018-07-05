import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import * as weatherData from '../services/weatherData';

class ForecastList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    weatherData.fetchWeatherForcastForCity('Zagreb', this.fetchWeather.bind(this));
  }

  fetchWeather(weather) {
    this.setState({
      list: weather,
    });
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.list}
          renderItem={({ item }) => (
            <Text>
              {item.weather[0].description}
            </Text>
          )}
        />
      </View>
    );
  }
}

export default ForecastList;
