import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import PropTypes from 'prop-types';
import * as weatherData from '../service/weatherData';

class CityListItem extends Component {
  static propTypes = {
    city: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      weatherReport: {},
    };
  }

  async componentDidMount() {
    const { city } = this.props;
    try {
      this.setState({
        isLoading: true,
      });

      const weatherReport = await weatherData.fetchWeatherData(city);

      this.setState({
        weatherReport,
      });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  renderInformation() {
    const { isLoading, weatherReport } = this.state;

    if (isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      );
    }

    return (
      <View style={style.cityInfo}>
        <Image
          style={style.weatherIcon}
          source={{
            uri: `https://openweathermap.org/img/w/${weatherReport.icon}.png`,
          }}
        />

        <Text style={style.infoText}>
          {weatherReport.weather_description}
        </Text>

        <View>
          <Text style={style.infoText}>
            {`min: ${weatherReport.minTemp}`}
          </Text>
          <Text style={style.infoText}>
            {`max: ${weatherReport.maxTemp}`}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    const { city } = this.props;

    return (
      <TouchableOpacity>
        <View style={style.citySection}>
          <Text style={style.cityName}>
            {city.value}
          </Text>

          {this.renderInformation()}
        </View>
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({
  citySection: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#495972',
    borderWidth: 0.5,
    padding: 10,
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
  },
  infoText: {
    color: 'white',
  },
  weatherIcon: {
    height: 50,
    width: 50,
  },
});

export default CityListItem;
