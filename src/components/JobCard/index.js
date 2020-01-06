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
} from './job-card.styles';

export default function JobCard({ id, title, teaser, salary }) {
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
          <WeekJobTitle style={styles.title}>{title}</WeekJobTitle>
          <WeekJobDescription>{teaser}</WeekJobDescription>
        </WeekJobBody>
        {salary.length ? (
          <WeekjobSalary>Salário: {salary}</WeekjobSalary>
        ) : (
          <WeekjobSalary>Salário não informado</WeekjobSalary>
        )}
      </>
    </WeekJobCard>
  );
}

JobCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  teaser: PropTypes.string.isRequired,
  salary: PropTypes.string.isRequired,
};
