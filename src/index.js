import React from 'react';
import { StatusBar } from 'react-native';

import Home from './pages/Home';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#AB9DF2" />
      <Home />
    </>
  );
}
