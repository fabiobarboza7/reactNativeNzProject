import React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';

import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from './routes';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="#202c39" />
        <Routes />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
