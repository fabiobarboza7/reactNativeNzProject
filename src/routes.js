import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Home from './pages/Home';
import Weather from './pages/Weather';

const StackNavigator = createDrawerNavigator(
  {
    Home,
    Weather,
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
