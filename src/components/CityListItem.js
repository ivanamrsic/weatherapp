import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  InteractionManager,
} from 'react-native';
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { setCurrentCity } from '../redux/actions';
import * as weather from '../services/weather';

class CityListItem extends Component {
  static propTypes = {
    city: PropTypes.object,
    navigation: PropTypes.object,
    setCurrentCityClick: PropTypes.func,
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.fetchWeatherDataForCity);
  }

  @autobind
  onPress() {
    const { navigation, city, setCurrentCityClick } = this.props;

    setCurrentCityClick(city);

    navigation.navigate('Forecast');
  }

  renderInformation() {
    const { city } = this.props;

    const { description, tempMax, tempMin, icon } = _.get(city, 'currentWeather');

    if (description === undefined) {
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

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  setCurrentCityClick: city => dispatch(setCurrentCity(city)),
  fetchCurrentWeatherForCityAction: cityName => dispatch(fetchCurrentWeatherForCity(cityName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CityListItem);
