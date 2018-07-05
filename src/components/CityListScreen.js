import React from 'react';
import { View, StyleSheet } from 'react-native';
import CityList from './CityList';

function CityListScreen() {
  return (
    <View style={styles.container}>
      <CityList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: '20%',
  },
});

export default CityListScreen;
