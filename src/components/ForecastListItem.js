import React, { Component } from 'react';
import { View, Text } from 'react-native';

class ForecastListItem extends Component {
  render() {
    return (
      <View>
        <Text>
          {this.props.forecast.dt_txt}
        </Text>
        {' '}
      </View>
    );
  }
}

export default ForecastListItem;
