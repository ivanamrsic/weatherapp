import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { cityReducer } from './src/redux';
import { CityListScreen, ForecastScreen } from './src/components';

const Navigator = createStackNavigator({
  CityList: { screen: CityListScreen },
  Forecast: {
    screen: ForecastScreen,
  },
});

const rootReducer = combineReducers({
  cityReducer,
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
