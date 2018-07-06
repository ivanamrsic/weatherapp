import React from 'react';
import { View, StyleSheet } from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ForecastList from './ForecastList';

function ForecastScreen(props) {
  const { navigation } = props;
  return (
    <View style={style.screen}>
      <ForecastList
        city={_.get(navigation, 'state.params.city')}
        weatherReport={_.get(navigation, 'state.params.weatherReport')}
      />
    </View>
  );
}

ForecastScreen.propTypes = {
  navigation: PropTypes.object,
};

const style = StyleSheet.create({
  screen: {
    backgroundColor: '#6398ed',
    width: '100%',
    height: '100%',
  },
});

export default ForecastScreen;
