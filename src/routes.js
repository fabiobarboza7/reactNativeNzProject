import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './pages/Home';

const StackNavigator = createStackNavigator(
  {
    Home,
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
