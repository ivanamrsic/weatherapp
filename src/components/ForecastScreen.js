import {
  View,
  FlatList,
  Text,
  StyleSheet,
  InteractionManager,
  ActivityIndicator,
} from 'react-native';
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ForecastListItem from './ForecastListItem';
import * as navigationService from '../services/navigation';
import { resetCurrentCity, fetchForcastForCity, resetForcast } from '../redux/actions';
import { getCurrentCity, getForcast } from '../redux/selectors';

class ForecastScreen extends Component {
  static navigationOptions = {
    title: 'Grad',
  };

  static propTypes = {
    navigation: PropTypes.object,
    city: PropTypes.object,
    resetCurrentCityAction: PropTypes.func,
    forcast: PropTypes.array,
    fetchForcastForCityAction: PropTypes.func,
    resetForcastAction: PropTypes.func,
  };

  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const navigationParams = navigationService.getParams(navigation);

    this.state = {
      navigationParams,
      isLoading: true,
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.fetchForcastData);
  }

  componentWillUnmount() {
    const { resetCurrentCityAction, resetForcastAction } = this.props;

    resetForcastAction();
    resetCurrentCityAction();
  }

  @autobind
  fetchForcastData() {
    const {
      city: { value },
      fetchForcastForCityAction,
    } = this.props;

    fetchForcastForCityAction(value);

    this.setState({
      isLoading: false,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  renderItem({ item }) {
    return <ForecastListItem forecast={item} key={item.date} />;
  }

  renderInfo() {
    const { isLoading } = this.state;
    const { forcast } = this.props;

    if (isLoading) {
      return <ActivityIndicator size="large" color="#000000" />;
    }

    return <FlatList data={forcast} renderItem={this.renderItem} />;
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
  city: getCurrentCity(state),
  forcast: getForcast(state),
});

const mapDispatchToProps = dispatch => ({
  resetCurrentCityAction: () => dispatch(resetCurrentCity()),
  fetchForcastForCityAction: cityName => dispatch(fetchForcastForCity(cityName)),
  resetForcastAction: () => dispatch(resetForcast()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForecastScreen);
