import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import devToolsEnhancer from 'remote-redux-devtools';
import { cityReducer } from './src/redux/reducers';
import { CityListScreen, ForecastScreen } from './src/components';

const Navigator = createStackNavigator({
  CityList: { screen: CityListScreen },
  Forecast: {
    screen: ForecastScreen,
  },
});

const rootReducer = combineReducers({
  city: cityReducer,
});

const store = createStore(rootReducer, devToolsEnhancer());

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
