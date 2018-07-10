import { createStackNavigator } from 'react-navigation';
import { CityListScreen, ForecastScreen } from './src/components';

export default createStackNavigator({
  CityList: { screen: CityListScreen },
  Forecast: {
    screen: ForecastScreen,
    navigationOptions: {
      title: 'Grad',
    },
  },
});
