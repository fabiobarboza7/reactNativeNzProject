import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';
import { getWeekJobs } from '../../services/seek.service';
import JobCard from '../../components/JobCard';

import { HomeContainer, CarouselContainer } from './home.styles';

const horizontalMargin = 20;
const slideWidth = 280;
const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;

const renderItem = ({ item }) => {
  const { id, title, teaser, salary } = item;

  return <JobCard id={id} title={title} teaser={teaser} salary={salary} />;
};

export default function Home() {
  const [weekJobs, setWeekJobs] = useState([]);

  useEffect(() => {
    async function loadWeekJobs() {
      const { data } = await getWeekJobs();
      setWeekJobs(data);
    }
    loadWeekJobs();
  }, []);

  return (
    <HomeContainer>
      <CarouselContainer>
        <Carousel
          layout="default"
          data={weekJobs}
          renderItem={renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
        />
      </CarouselContainer>
    </HomeContainer>
  );
}

renderItem.propTypes = {
  item: PropTypes.isRequired,
};

Home.navigationOptions = {
  title: 'Nz for Brazilians',
  headerStyle: {
    backgroundColor: '#ED6A5A',
  },
  headerTintColor: '#F5F7DC',
};
