import { FlatList, View, StyleSheet, InteractionManager } from 'react-native';
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import CityListItem from './CityListItem';
import { fetchCurrentWeatherForCity, setCurrentCity, getCities } from '../redux';

class CityListScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    cities: PropTypes.array,
    fetchCityWeather: PropTypes.func,
    onCityPress: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.fetchWeather());
  }

  @autobind
  handleRefresh() {
    this.setState(
      {
        refreshing: true,
      },
      this.fetchWeather()
    );
  }

  @autobind
  fetchWeather() {
    const { cities, fetchCityWeather } = this.props;

    const actions = _.map(cities, city => {
      fetchCityWeather(city.value);
    });

    Promise.all(actions).then(() => this.setState({ refreshing: false }));
  }

  @autobind
  renderItem({ item: city }) {
    const { navigation, onCityPress } = this.props;
    return (
      <CityListItem city={city} navigation={navigation} key={city.value} onPress={onCityPress} />
    );
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

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    onCityPress: setCurrentCity,
    fetchCityWeather: fetchCurrentWeatherForCity,
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CityListScreen);
