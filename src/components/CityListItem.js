import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  InteractionManager,
} from 'react-native';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import * as weather from '../services/weather';

class CityListItem extends Component {
  static propTypes = {
    city: PropTypes.object,
    navigation: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      weatherReport: {},
    };
  }

  async componentDidMount() {
    InteractionManager.runAfterInteractions(this.fetchWeatherDataForCity);
  }

  @autobind
  onPress() {
    const { navigation, city } = this.props;
    const { weatherReport } = this.state;

    navigation.navigate('Forecast', { city, weatherReport });
  }

  @autobind
  async fetchWeatherDataForCity() {
    const { city } = this.props;

    try {
      this.setState({
        isLoading: true,
      });

      const weatherReport = await weather.fetchWeatherData(city);

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
    const {
      isLoading,
      weatherReport: { tempMin, tempMax, icon, description },
    } = this.state;

    if (isLoading) {
      return <ActivityIndicator size="large" color="#000000" />;
    }

    return (
      <View style={style.cityInfo}>
        <Image
          style={style.weatherIcon}
          source={{
            uri: weather.getIconURL(icon),
          }}
        />

        <Text style={style.infoText}>
          {description}
        </Text>

        <View>
          <Text style={style.infoText}>
            {`min: ${tempMin}`}
          </Text>
          <Text style={style.infoText}>
            {`max: ${tempMax}`}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    const { city } = this.props;

    return (
      <TouchableOpacity onPress={this.onPress}>
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
