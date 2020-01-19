import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, ToastAndroid, Vibration, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FavoriteIcon from 'react-native-vector-icons/MaterialIcons';
import JobCard from '../../components/JobCard';

import {
  NoLocalSavedJobsContainer,
  NoLocalSavedJobsInfo,
} from './saved-jobs.styles';
import { Store } from '../../store';
import { removeJob } from '../../store/modules/jobs/actions';

export default function SavedJobs() {
  const [state, dispatch] = useContext(Store);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs(...state.jobs);
  }, [jobs, state, state.jobs]);

  function handleRemoveJobState(job) {
    dispatch(removeJob({ id: job.id }));

    Vibration.vibrate(100);
    // setLocalSavedJobs(updateState);
    // AsyncStorage.setItem('savedJobs', JSON.stringify([...updateState]));
    ToastAndroid.showWithGravity(
      'Job removido com sucesso :)',
      ToastAndroid.LONG,
      ToastAndroid.TOP
    );
  }

  function handleRemoveAllJobsFromCache() {
    AsyncStorage.clear(() => {});
    ToastAndroid.showWithGravity(
      'Todos os jobs foram removidos com sucesso :)',
      ToastAndroid.LONG,
      ToastAndroid.TOP
    );
  }

  return jobs && jobs.length ? (
    <>
      <ScrollView>
        {jobs.map(job => {
          return (
            <JobCard
              key={job.id}
              job={job}
              removeIcon
              handleRemoveJobState={handleRemoveJobState}
            />
          );
        })}
      </ScrollView>
      <Button
        color="#ed6a5a"
        onPress={() => handleRemoveAllJobsFromCache()}
        title="DELETAR TODOS JOBS SALVOS"
      />
    </>
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
