import { createStackNavigator } from 'react-navigation';
import CityListScreen from './src/components/CityListScreen';
import ForecastScreen from './src/components/ForecastScreen';

export default createStackNavigator({
  CityList: { screen: CityListScreen },
  Forecast: {
    screen: ForecastScreen,
    navigationOptions: {
      title: 'Grad',
    },
  },
});
