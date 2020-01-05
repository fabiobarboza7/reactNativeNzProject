import React from 'react';
import { Text } from 'react-native';

// import { Container } from './styles';

export default function Home() {
  return <Text>Hi</Text>;
}

Home.navigationOptions = {
  title: 'NZ FOR BRAZILIAN',
  headerStyle: {
    backgroundColor: '#fff',
  },
  headerTintColor: '#24231B',
};
