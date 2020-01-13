import React, { useState } from 'react';
import { Linking, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native-gesture-handler';
import icon from '../../assets/Images/logo-seek.png';
import styles from '../../styles/snap-caroulse-style';

import {
  WeekJobCard,
  WeekJobBody,
  WeekJobTitle,
  WeekJobDescription,
  WeekjobSalary,
  WeekjobApply,
  WeekjobImage,
  WeekJobDefaultLogo,
  WeekJobInfo,
  WeekJobSaveIcon,
  WeekSalaryBox,
} from './job-card.styles';

export default function JobCard({ job }) {
  const [saved, setSaved] = useState(false);
  const { id, title, teaser, salary, location, branding } = job;

  function handleSaveJob() {
    setSaved(!saved);
  }

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
    <WeekJobCard style={styles.slide}>
      <>
        <WeekJobBody>
          {branding === null ? (
            <WeekJobDefaultLogo source={icon} />
          ) : (
            <WeekjobImage
              resizeMode="contain"
              source={{ uri: branding.logo.url }}
            />
          )}
          <WeekJobTitle>
            {title} - {location}
          </WeekJobTitle>
          <WeekJobDescription>{teaser}</WeekJobDescription>
          {salary.length ? (
            <WeekjobSalary>Oferta: {salary} </WeekjobSalary>
          ) : null}
        </WeekJobBody>
        <WeekJobInfo>
          <WeekSalaryBox>
            <TouchableHighlight onPress={() => handleOpenLink(id)}>
              <WeekjobApply>Ver mais</WeekjobApply>
            </TouchableHighlight>
          </WeekSalaryBox>
          <WeekJobSaveIcon onPress={() => handleSaveJob()} saved={saved} />
        </WeekJobInfo>
      </>
    </WeekJobCard>
  );
}

JobCard.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    teaser: PropTypes.string,
    salary: PropTypes.string,
    location: PropTypes.string,
    branding: PropTypes.shape({
      id: PropTypes.string,
      logo: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
  }).isRequired,
};
