import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// import { Container } from './styles';

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    async function getSavedJobs() {
      const jobs = await AsyncStorage.getItem('savedJobs');

      if (jobs) {
        setSavedJobs(jobs);
      }
    }

    getSavedJobs();
  }, [savedJobs]);

  function Item(item) {
    return (
      <View>
        <Text>{JSON.stringify(item)}</Text>
      </View>
    );
  }

  return (
    savedJobs && (
      <View style={{ flex: 1 }}>
        <Text>Hi</Text>
        <FlatList
          data={savedJobs}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={item => item.id}
        />
      </View>
    )
  );
}

SavedJobs.navigationOptions = {
  title: 'Saved Jobs',
  headerStyle: {
    backgroundColor: '#ED6A5A',
  },
  headerTintColor: '#F5F7DC',
};
