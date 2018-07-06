import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import CityList from './CityList';

function CityListScreen(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <CityList navigation={navigation} />
    </View>
  );
}

CityListScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default CityListScreen;
