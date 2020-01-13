import React, { useEffect, useState } from 'react';
import { ScrollView, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { getWeekJobs, searchKeywordJobs } from '../../services/seek.service';
import JobCard from '../../components/JobCard';

import {
  HomeContainer,
  HomeJobsTitle,
  SearchJobTextInput,
} from './home.styles';

export default function Home() {
  const [weekJobs, setWeekJobs] = useState([]);
  const [keywordJob, setKeywordJob] = useState('');
  const [myJobs, setMyJobs] = useState([]);
  const [localStorage, setLocalStorage] = useState([]);

  function handleSaveJob(job) {
    const duplicatedJob = myJobs.find(_job => _job.id === job.id);

    if (!duplicatedJob) {
      job.isSaved = false;
      setMyJobs([...myJobs, job]);
      AsyncStorage.setItem('savedJobs', JSON.stringify([...myJobs]));
    } else {
      duplicatedJob.isSaved = true;
      AsyncStorage.setItem('savedJobs', JSON.stringify([...myJobs]));
    }
  }

  useEffect(() => {
    async function loadLocalStorage() {
      const data = await AsyncStorage.getItem('savedJobs');
      setLocalStorage([JSON.parse(data)]);
    }
    loadLocalStorage();

    async function loadWeekJobs() {
      const { data } = await getWeekJobs();

      setWeekJobs(data);
    }
    loadWeekJobs();
  }, []);

  async function searchJobs(searchKeywordJob) {
    setKeywordJob(searchKeywordJob);
    const { data } = await searchKeywordJobs(searchKeywordJob);
    setWeekJobs(data);
  }

  function handleResetLocalStorage() {
    AsyncStorage.clear(success => console.log(success));
  }

  return (
    <>
      <HomeContainer>
        <HomeJobsTitle>JOBS DA SEMANA</HomeJobsTitle>
        <Button title="reset" onPress={() => handleResetLocalStorage()} />
        <SearchJobTextInput
          value={keywordJob}
          onChangeText={text => searchJobs(text)}
        />
      </HomeContainer>
      <ScrollView>
        {console.log(localStorage)}
        {weekJobs.map(job => {
          return (
            <JobCard
              key={job.id}
              job={job}
              handleSaveJob={() => handleSaveJob({ ...job, isSaved: true })}
              isSaved
            />
          );
        })}
      </ScrollView>
    </>
  );
}

Home.navigationOptions = {
  title: 'Home',
  headerStyle: {
    backgroundColor: '#ED6A5A',
  },
  headerTintColor: '#F5F7DC',
};
