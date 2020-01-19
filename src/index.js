import React, { useReducer } from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';

import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from './routes';

import { Store } from './store';

import modules from './store/modules';

const { Provider } = Store;

export default function App() {
  const store = useReducer(modules, { jobs: [] });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="#202c39" />
        <Provider value={store}>
          <Routes />
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
