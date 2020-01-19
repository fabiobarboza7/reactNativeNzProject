import React, { useEffect, useState, useContext } from 'react';
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
import { Store } from '../../store';
import { jobsStatus } from '../../store/modules/jobs/actions';

export default function Home() {
  const [state, dispatch] = useContext(Store);
  const [weekJobs, setWeekJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [localStorage, setLocalStorage] = useState([]);
  const [favoriteJobs, setFavoriteJobs] = useState([]);
  // get weekJobs from API
  useEffect(() => {
    async function getWeekJobsService() {
      const { data } = await getWeekJobs();
      const newData = data.map(job => ({ ...job, isFavorite: false }));
      setWeekJobs(newData);
    }

    getWeekJobsService();
  }, []);

  // get localStorage from device
  useEffect(() => {
    async function getLocalStorageData() {
      const data = await AsyncStorage.getItem('savedJobs');
      setLocalStorage(JSON.parse(data));
    }

    getLocalStorageData();
  }, []);

  function handleSaveJob(job) {
    job.isFavorite = !job.isFavorite;
    if (job.isFavorite) {
      const duplicated = favoriteJobs.find(
        _favorite => _favorite.id === job.id
      );
      if (!duplicated) {
        setFavoriteJobs([...favoriteJobs, job]);
      }
    } else {
      const removeFavorite = favoriteJobs.filter(
        _favorite => _favorite.id !== job.id
      );
      setFavoriteJobs([...removeFavorite]);
    }

    Vibration.vibrate(100);
  }

  // update the view based on favoriteJobs
  useEffect(() => {
    async function getJobsData() {
      const jobsData = weekJobs.filter(week => {
        return favoriteJobs.map(_favorite => {
          if (_favorite.id === week.id) {
            week.isFavorite = true;
          }
          return week;
        });
      });

      setJobs(jobsData);
    }

    getJobsData();
  }, [favoriteJobs, weekJobs]);

  useEffect(() => {
    dispatch(jobsStatus({ jobs: favoriteJobs }));
  }, [dispatch, favoriteJobs]);

  return (
    <>
      <HomeContainer>
        <HomeJobsTitle>JOBS DA SEMANA</HomeJobsTitle>
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
