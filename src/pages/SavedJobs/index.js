import React, { useState, useEffect } from 'react';
import { ScrollView, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FavoriteIcon from 'react-native-vector-icons/MaterialIcons';
import JobCard from '../../components/JobCard';

import {
  NoLocalSavedJobsContainer,
  NoLocalSavedJobsInfo,
} from './saved-jobs.styles';

export default function SavedJobs() {
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(0);
  const [localSavedJobs, setLocalSavedJobs] = useState([]);

  useEffect(() => {
    async function getSavedJobs() {
      const data = await AsyncStorage.getItem('savedJobs');
      setLocalSavedJobs(JSON.parse(data));
      setLoading(true);
    }
    setInterval(() => {
      setReload(1);
    }, 1000);
    getSavedJobs();
  }, [localSavedJobs, reload]);

  function handleRemoveJobFromCache(job) {
    const updateLocalStorage = localSavedJobs.filter(
      _job => _job.id !== job.id
    );

    setLocalSavedJobs(updateLocalStorage);
    AsyncStorage.setItem('savedJobs', JSON.stringify([...updateLocalStorage]));

    ToastAndroid.showWithGravity(
      'Job removido com sucesso :)',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    );
  }

  return localSavedJobs.length ? (
    <ScrollView>
      {localSavedJobs.map(job => {
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
  ) : (
    <NoLocalSavedJobsContainer>
      <NoLocalSavedJobsInfo>NÃO HÁ JOBS SALVOS</NoLocalSavedJobsInfo>
    </NoLocalSavedJobsContainer>
  );
}

SavedJobs.navigationOptions = {
  drawerIcon: () => <FavoriteIcon color="#ed6a5a" size={25} name="favorite" />,
  title: 'Saved Jobs',
};
