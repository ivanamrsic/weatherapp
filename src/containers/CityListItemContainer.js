import React, { Component } from 'react';
import CityListItem from '../components/CityListItem';
import axios from 'react-native-axios';
import * as WeatherDataUtil from '../utils/WeatherDataUtil';

class CityListItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      weatherReport: {
        coord: {},
        weather: [
          {
            id: null,
            main: null,
            description: null,
            icon: null,
          },
        ],
        base: null,
        main: {},
        visibility: null,
      },
    };
  }

  onPress = () => {};

  componentDidMount() {
    try {
      this.setState({
        isLoading: true,
      });

      axios
        .get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: this.props.city.value,
            APPID: WeatherDataUtil.APPID,
          },
        })
        .then(response =>
          this.setState({
            weatherReport: response.data,
          })
        );
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    return (
      <CityListItem
        city={this.props.city}
        weatherReport={this.state.weatherReport}
        isLoading={this.state.isLoading}
        onPress={this.onPress.bind(this)}
      />
    );
  }
}

export default CityListItemContainer;
