import React from 'react';
import PropTypes from 'prop-types';
import CityList from './CityList';

function CityListScreen(props) {
  const { navigation } = props;
  return <CityList navigation={navigation} />;
}

CityListScreen.propTypes = {
  navigation: PropTypes.object,
};

export default CityListScreen;
