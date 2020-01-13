import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
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

  useEffect(() => {
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

  return (
    <>
      <HomeContainer>
        <HomeJobsTitle>JOBS DA SEMANA</HomeJobsTitle>
        <SearchJobTextInput
          value={keywordJob}
          onChangeText={text => searchJobs(text)}
        />
      </HomeContainer>
      <ScrollView>
        {weekJobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
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
