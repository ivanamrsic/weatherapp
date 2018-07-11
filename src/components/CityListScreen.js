import { FlatList, View, StyleSheet } from 'react-native';
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import CityListItem from './CityListItem';
import { getCities } from '../redux/selectors';
import { fetchCurrentWeatherForCity } from '../redux/actions';

class CityListScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    cities: PropTypes.array,
    fetchCurrentWeatherForCityAction: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {
    this.fetchWeatherForCities();
  }

  @autobind
  handleRefresh() {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        this.fetchWeatherForCities();
      }
    );
  }

  @autobind
  fetchWeatherForCities() {
    const { cities, fetchCurrentWeatherForCityAction } = this.props;

    _.forEach(cities, city => {
      fetchCurrentWeatherForCityAction(city.value);
    });

    this.setState({
      refreshing: false,
    });
  }

  @autobind
  renderItem({ item: city }) {
    const { navigation } = this.props;
    return <CityListItem city={city} navigation={navigation} key={city.value} />;
  }

  render() {
    const { cities } = this.props;
    const { refreshing } = this.state;

    return (
      <View style={style.list}>
        <FlatList
          refreshing={refreshing}
          onRefresh={this.handleRefresh}
          data={cities}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  list: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#4286f4',
  },
});

const mapStateToProps = state => ({
  cities: getCities(state),
});

const mapDispatchToProps = dispatch => ({
  fetchCurrentWeatherForCityAction: cityName => dispatch(fetchCurrentWeatherForCity(cityName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CityListScreen);
