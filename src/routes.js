import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Home from './pages/Home';
import Weather from './pages/Weather';
import Currency from './pages/Currency';

const StackNavigator = createDrawerNavigator(
  {
    Home,
    Weather,
    Currency,
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: '#112',
      },
      headerTintColor: '#fff',
    },
  }
);

const Routes = createAppContainer(StackNavigator);

export default Routes;
