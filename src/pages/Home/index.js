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
  const [jobs, setJobs] = useState([]);
  const [favoriteJobs, setFavoriteJobs] = useState([]);
  const [localStorage, setLocalStorage] = useState([]);

  async function updateLocalStorage(job) {
    const data = await AsyncStorage.getItem('savedJobs');
    const localStorageParsed = JSON.parse(data);
    if (localStorageParsed && localStorageParsed.length) {
      const duplicatedData = localStorageParsed.find(
        _local => _local.id === job.id
      );

      if (!duplicatedData) {
        return AsyncStorage.setItem(
          'savedJobs',
          JSON.stringify([...favoriteJobs])
        );
      }
      return false;
    }

    return AsyncStorage.setItem('savedJobs', JSON.stringify([...favoriteJobs]));
  }

  function handleSaveJob(job) {
    job.isFavorite = !job.isFavorite;
    setFavoriteJobs([...favoriteJobs, job]);
    setWeekJobs([...weekJobs]);

    updateLocalStorage(job);
  }

  useEffect(() => {
    async function loadLocalStorage() {
      const data = await AsyncStorage.getItem('savedJobs');
      setLocalStorage(JSON.parse(data));
    }

    loadLocalStorage();

    async function loadWeekJobs() {
      const { data } = await getWeekJobs();
      const newData = data.map(job => ({ ...job, isFavorite: false }));
      setWeekJobs(newData);
    }

    loadWeekJobs();
  }, []);

  useEffect(() => {
    async function getCorrectJobsData() {
      if (localStorage && localStorage.length) {
        // console.log(localStorage, 'localStorage');
        weekJobs.map(data => {
          return localStorage.map(_local => {
            if (_local.id === data.id) {
              data.isFavorite = true;
            }
            return data;
          });
        });
      }
      setJobs(weekJobs);
    }

    getCorrectJobsData();
  }, [localStorage, weekJobs]);

  async function searchJobs(searchKeywordJob) {
    setKeywordJob(searchKeywordJob);
    const { data } = await searchKeywordJobs(searchKeywordJob);
    setWeekJobs(data);
  }

  return (
    <>
      <HomeContainer>
        <HomeJobsTitle>JOBS DA SEMANA</HomeJobsTitle>
        {/* <Button title="reset" onPress={() => handleResetLocalStorage()} /> */}
        <SearchJobTextInput
          value={keywordJob}
          onChangeText={text => searchJobs(text)}
        />
      </HomeContainer>
      <ScrollView>
        {jobs &&
          jobs.map(job => {
            return (
              <JobCard
                key={job.id}
                job={job}
                handleSaveJob={() => handleSaveJob(job)}
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
