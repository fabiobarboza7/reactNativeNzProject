import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Home from './pages/Home';
import Weather from './pages/Weather';
import Currency from './pages/Currency';
import SavedJobs from './pages/SavedJobs';

const StackNavigator = createDrawerNavigator(
  {
    Home,
    Weather,
    Currency,
    SavedJobs,
  },
  {
    drawerBackgroundColor: '#202c39',
    contentOptions: {
      activeTintColor: '#ed6a5a',
      inactiveTintColor: '#f5f7dc',
    },
  }
);

const Routes = createAppContainer(StackNavigator);

export default Routes;
