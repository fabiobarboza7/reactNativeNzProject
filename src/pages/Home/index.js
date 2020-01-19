import React, { useEffect, useState } from 'react';
import { ScrollView, Button, Vibration } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import HomeIcon from 'react-native-vector-icons/FontAwesome';
import { getWeekJobs, searchKeywordJobs } from '../../services/seek.service';
import JobCard from '../../components/JobCard';

import {
  HomeContainer,
  HomeJobsTitle,
  // SearchJobTextInput,
} from './home.styles';

export default function Home() {
  const [weekJobs, setWeekJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [favoriteJobs, setFavoriteJobs] = useState([]);
  const [localStorage, setLocalStorage] = useState([]);

  async function updateLocalStorage(job) {
    console.log('job: ', job);
    // const data = await AsyncStorage.getItem('savedJobs');
    // const localStorageParsed = JSON.parse(data);
    if (localStorage && localStorage.length) {
      const duplicatedData = localStorage.find(_local => _local.id === job.id);
      if (!duplicatedData) {
        console.log('Duplicated: ', duplicatedData);
        return AsyncStorage.setItem(
          'savedJobs',
          JSON.stringify([...favoriteJobs])
        );
      }
      console.log('Not duplicated');
      return false;
    }

    return AsyncStorage.setItem('savedJobs', JSON.stringify([...favoriteJobs]));
  }

  function handleSaveJob(job) {
    job.isFavorite = !job.isFavorite;
    const duplicatedData = favoriteJobs.find(
      _favorite => _favorite.id === job.id
    );

    if (!duplicatedData) {
      setFavoriteJobs([...favoriteJobs, job]);
      // setWeekJobs([...weekJobs]);
      updateLocalStorage(job);
    } else {
      setFavoriteJobs([...favoriteJobs]);
      updateLocalStorage(job);
    }

    Vibration.vibrate(100);
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
    console.log(`LocalStorage: `, localStorage);
    async function getCorrectJobsData() {
      if (localStorage && localStorage.length) {
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

  // function searchJobs(searchKeywordJob) {
  //   setKeywordJob(searchKeywordJob);
  //   const queryData = weekJobs.filter(job =>
  //     job.title.startsWith(searchKeywordJob)
  //   );
  //   setWeekJobs(queryData);
  // }

  return (
    <>
      <HomeContainer>
        <HomeJobsTitle>JOBS DA SEMANA</HomeJobsTitle>
        {/* <SearchJobTextInput
          value={keywordJob}
          onChangeText={text => searchJobs(text)}
        /> */}
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
  drawerIcon: () => <HomeIcon color="#f5f7dc" size={25} name="home" />,
  title: 'Home',
};
