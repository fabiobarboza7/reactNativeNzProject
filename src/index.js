import React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';

import Routes from './routes';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#ED6A5A" />
      <Routes />
    </>
  );
}
