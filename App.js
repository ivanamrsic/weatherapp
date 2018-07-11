import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import devToolsEnhancer from 'remote-redux-devtools';
import asyncAwait from 'redux-async-await';
import { currentCityReducer, forcastReducer, citiesReducer } from './src/redux/reducers';
import { CityListScreen, ForecastScreen } from './src/components';

const Navigator = createStackNavigator({
  CityList: { screen: CityListScreen },
  Forecast: { screen: ForecastScreen },
});

const rootReducer = combineReducers({
  city: currentCityReducer,
  forcast: forcastReducer,
  cities: citiesReducer,
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(asyncAwait),
    devToolsEnhancer()
  )
);

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
