import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  InteractionManager,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import ForecastListItem from './ForecastListItem';
import * as weatherService from '../services/weather';
import * as navigationService from '../services/navigation';

class ForecastScreen extends Component {
  static navigationOptions = {
    title: 'Grad',
  };

  static propTypes = {
    navigation: PropTypes.object,
    city: PropTypes.object,
  };

  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const navigationParams = navigationService.getParams(navigation);

    this.state = {
      forecastByDaysList: [],
      navigationParams,
      isLoading: true,
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.fetchForecastData);
  }

  @autobind
  async fetchForecastData() {
    const {
      city: { value },
    } = this.props;

    const forecastByDaysList = await weatherService.fetchWeatherForcastForCity(value);

    this.setState({
      forecastByDaysList,
      isLoading: false,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  renderItem({ item }) {
    return <ForecastListItem forecast={item} key={item.date} />;
  }

  renderInfo() {
    const { isLoading, forecastByDaysList } = this.state;

    if (isLoading) {
      return <ActivityIndicator size="large" color="#000000" />;
    }

    return <FlatList data={forecastByDaysList} renderItem={this.renderItem} />;
  }

  render() {
    const {
      city: { value },
    } = this.props;
    const {
      navigationParams: {
        weatherReport: { description, temp },
      },
    } = this.state;

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
        {this.renderInfo()}
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
    flex: 0.8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6489c4',
  },
  currentTemperature: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  screen: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#6489c4',
  },
});

const mapStateToProps = state => ({
  city: state.cityReducer,
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForecastScreen);
