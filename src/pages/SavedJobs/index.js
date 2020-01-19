import React, { useState, useEffect } from 'react';
import { Button, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import JobCard from '../../components/JobCard';

// import { Container } from './styles';

export default function SavedJobs() {
  const [localSavedJobs, setLocalSavedJobs] = useState([]);

  useEffect(() => {
    async function getSavedJobs() {
      const data = await AsyncStorage.getItem('savedJobs');
      setLocalSavedJobs(JSON.parse(data));
    }

    getSavedJobs();
  }, []);

  function handleRemoveJobFromCache(job) {
    const updateLocalStorage = localSavedJobs.filter(
      _job => _job.id !== job.id
    );

    AsyncStorage.setItem('savedJobs', JSON.stringify([...updateLocalStorage]));
  }

  return (
    <>
      <ScrollView>
        {localSavedJobs &&
          localSavedJobs.map(job => {
            return (
              <JobCard
                key={job.id}
                job={job}
                removeIcon
                handleRemoveJobFromCache={handleRemoveJobFromCache}
              />
            );
          })}
      </ScrollView>
    </>
  );
}

SavedJobs.navigationOptions = {
  title: 'Saved Jobs',
  headerStyle: {
    backgroundColor: '#ED6A5A',
  },
  headerTintColor: '#F5F7DC',
};
