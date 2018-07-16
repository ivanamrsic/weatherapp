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
import { bindActionCreators } from 'redux';
import ForecastListItem from './ForecastListItem';
import {
  resetCurrentCity,
  fetchForcastForCity,
  resetForcast,
  getCurrentCity,
  getForcast,
} from '../redux';

class ForecastScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Forcast for ${navigation.state.params.title}`,
  });

  static propTypes = {
    city: PropTypes.object,
    resetCurrentCity: PropTypes.func,
    forcast: PropTypes.array,
    fetchForcastForCity: PropTypes.func,
    resetForcast: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.fetchForcastData);
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-shadow
    const { resetCurrentCity, resetForcast } = this.props;

    resetForcast();
    resetCurrentCity();
  }

  @autobind
  fetchForcastData() {
    const {
      // eslint-disable-next-line no-shadow
      fetchForcastForCity,
      city: { value },
    } = this.props;

    fetchForcastForCity(value);

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
      city: {
        currentWeather: { description, temp },
        value,
      },
    } = this.props;

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

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    resetCurrentCity,
    fetchForcastForCity,
    resetForcast,
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForecastScreen);
