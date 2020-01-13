import React, { useState, useEffect } from 'react';
import { PermissionsAndroid, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Icon from '../../components/Icon';
import {
  WeatherContainer,
  StrongText,
  WeatherScrollView,
  WeatherScrollBox,
  WeatherScrollTemp,
  WeatherScrollStatus,
  WeatherText,
} from './weather.styles';

import translatePtBr from '../../util/translate-weather';
import formatDate from '../../util/formatDate';
import { getCurrentWeather, getWeather } from '../../services/weather.service';

export default function Weather() {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [currentWeather, setCurrentWeather] = useState({
    consolidated_weather: [],
  });
  const [zoneWeather, setZoneWeather] = useState([]);
  const [userPosition, setUserPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  function handleAllowLocation() {
    Alert.alert('You have to allow the mobile location');
  }

  useEffect(() => {
    async function verifyLocationPermission() {
      if (!hasLocationPermission) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setHasLocationPermission(true);
        } else {
          setHasLocationPermission(false);
          handleAllowLocation();
        }
      }
    }
    verifyLocationPermission();

    async function loadCurrentWeather() {
      if (zoneWeather[0] !== undefined) {
        const data = await getCurrentWeather(zoneWeather[0].woeid);
        setCurrentWeather(data);
      }
    }
    loadCurrentWeather();
  }, [hasLocationPermission, zoneWeather]);

  useEffect(() => {
    async function loadZoneWeather() {
      const weather = await getWeather(
        userPosition.latitude,
        userPosition.longitude
      );

      setZoneWeather(weather);
    }

    Geolocation.getCurrentPosition(
      position => {
        setUserPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        console.log(error.code, error.message);
      }
    );
    loadZoneWeather();
  }, [userPosition.latitude, userPosition.longitude]);

  return (
    <WeatherContainer>
      <StrongText>
        {currentWeather.title ? currentWeather.title : 'carregando cidade'} -
        Clima nos próximos dias
      </StrongText>
      <WeatherScrollView>
        {currentWeather.consolidated_weather.map(data => (
          <WeatherScrollBox key={data.id.toString()}>
            <WeatherScrollTemp>
              <Icon iconName={data.weather_state_abbr} />
            </WeatherScrollTemp>
            <WeatherScrollStatus>
              <WeatherText>{formatDate(data.applicable_date)}</WeatherText>
              <WeatherText>
                {translatePtBr(data.weather_state_name)}
              </WeatherText>
            </WeatherScrollStatus>
            <WeatherScrollTemp>
              <WeatherText>min: {data.min_temp.toFixed(0)} Cº</WeatherText>
              <WeatherText>max: {data.max_temp.toFixed(0)} Cº</WeatherText>
            </WeatherScrollTemp>
          </WeatherScrollBox>
        ))}
      </WeatherScrollView>
    </WeatherContainer>
  );
}

Weather.navigationOptions = {
  title: 'Weather Info',
  headerStyle: {
    backgroundColor: '#ED6A5A',
  },
  headerTintColor: '#F5F7DC',
};
