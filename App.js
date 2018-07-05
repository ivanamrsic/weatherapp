import { createStackNavigator } from 'react-navigation';
import CityListScreen from './src/components/CityListScreen';
import ForecastScreen from './src/components/ForecastScreen';

export default createStackNavigator({
  Forecast: { screen: ForecastScreen },
  CityList: { screen: CityListScreen },
});
