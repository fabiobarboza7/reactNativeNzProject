import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';
import { getWeekJobs } from '../../services/seek.service';
import JobCard from '../../components/JobCard';

import {
  HomeContainer,
  CarouselContainer,
  HomeJobsTitle,
  BoxDivisor,
} from './home.styles';

const horizontalMargin = 20;
const slideWidth = 280;
const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;

const renderItem = ({ item }) => {
  return <JobCard item={item} />;
};

export default function Home() {
  const [weekJobs, setWeekJobs] = useState([]);

  useEffect(() => {
    async function loadWeekJobs() {
      const { data } = await getWeekJobs();
      console.log(data);
      setWeekJobs(data);
    }
    loadWeekJobs();
  }, []);

  return (
    <HomeContainer>
      <BoxDivisor />
      <CarouselContainer>
        <HomeJobsTitle>JOBS DA SEMANA</HomeJobsTitle>
        <Carousel
          layout="default"
          data={weekJobs}
          renderItem={renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
        />
      </CarouselContainer>
      <BoxDivisor />
    </HomeContainer>
  );
}

renderItem.propTypes = {
  item: PropTypes.shape({}).isRequired,
};

Home.navigationOptions = {
  title: 'Nz for Brazilians',
  headerStyle: {
    backgroundColor: '#ED6A5A',
  },
  headerTintColor: '#F5F7DC',
};
