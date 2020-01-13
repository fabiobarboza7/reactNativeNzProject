import React from 'react';
import { Linking, Alert } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles/snap-caroulse-style';

import {
  WeekJobCard,
  WeekJobBody,
  WeekJobTitle,
  WeekJobDescription,
  WeekjobSalary,
  WeekjobApply,
  WeekjobImage,
} from './job-card.styles';

export default function JobCard({ item }) {
  const { id, title, teaser, salary, location, branding } = item;

  function handleOpenLink(link) {
    const thisLink = `https://www.seek.co.nz/job/${link}`;
    Linking.canOpenURL(thisLink).then(supported => {
      if (supported) {
        Linking.openURL(thisLink);
      } else {
        Alert.alert('Ops, houve algum problema ao abrir o link');
      }
    });
  }

  return (
    <WeekJobCard onPress={() => handleOpenLink(id)} style={styles.slide}>
      <>
        <WeekJobBody>
          {branding !== null && (
            <WeekjobImage
              resizeMode="contain"
              source={{ uri: branding.logo.url }}
            />
          )}
          <WeekJobTitle>
            {title} - {location}
          </WeekJobTitle>
          <WeekJobDescription>{teaser}</WeekJobDescription>
        </WeekJobBody>
        {salary.length ? (
          <WeekjobSalary>
            Salário: {salary} - <WeekjobApply>Ver mais</WeekjobApply>
          </WeekjobSalary>
        ) : (
          <WeekjobApply>Ver mais</WeekjobApply>
        )}
      </>
    </WeekJobCard>
  );
}

JobCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    teaser: PropTypes.string,
    salary: PropTypes.string,
    location: PropTypes.string,
    branding: PropTypes.shape({
      id: PropTypes.string,
      logo: PropTypes.shape({
        url: PropTypes.string,
      }).isRequired,
    }),
  }).isRequired,
};
