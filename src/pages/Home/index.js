import React, { useEffect, useState } from 'react';
import { Dimensions, PermissionsAndroid, Alert } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';
import Geolocation from 'react-native-geolocation-service';
import { getWeekJobs } from '../../services/seek.service';
import { getWeather, getCurrentWeather } from '../../services/weather.service';
import { conversion } from '../../services/currency.service';
import JobCard from '../../components/JobCard';
import Icon from '../../components/Icon';
import formatDate from '../../util/formatDate';
import translatePtBr from '../../util/translate-weather';

import {
  HomeContainer,
  CarouselContainer,
  HomeJobsTitle,
  BoxDivisor,
  StrongText,
  WeatherScrollView,
  WeatherScrollBox,
  WeatherScrollTemp,
  WeatherScrollStatus,
  WeatherContainer,
  WeatherText,
  LabelText,
  Amount,
  ExchangeInput,
  ExchangeButton,
  ExchangeButtonText,
} from './home.styles';

const horizontalMargin = 20;
const slideWidth = 280;
const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;

const renderItem = ({ item }) => {
  return <JobCard item={item} />;
};

export default function Home() {
  const [amount, setAmount] = useState(1);
  const [conversionNz, setConversionNz] = useState({ rates: { NZD: 0 } });
  const [conversionBrl, setConversionBrl] = useState({ rates: { BRL: 0 } });
  const [currency, setCurrency] = useState(['BRL', 'NZD']);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [weekJobs, setWeekJobs] = useState([]);
  const [userPosition, setUserPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [currentWeather, setCurrentWeather] = useState({
    consolidated_weather: [],
  });
  const [zoneWeather, setZoneWeather] = useState([]);

  function handleAllowLocation() {
    Alert.alert('You have to allow the mobile location');
  }

  function handleConvertionResult() {
    if (currency[0] === 'BRL') {
      return conversionNz.rates.NZD.toFixed(2);
    }
    return conversionBrl.rates.BRL.toFixed(2);
  }

  function handleSetAmount(e) {
    setAmount(e);
  }

  function handleExchangeCurrency() {
    if (currency[0] === 'BRL') {
      setCurrency(['NZD', 'BRL']);
    } else {
      setCurrency(['BRL', 'NZD']);
    }
  }

  useEffect(() => {
    async function loadConvertion() {
      const data = await conversion(amount, currency[0], currency[1]);
      if (currency[0] === 'BRL') {
        setConversionNz(data);
      } else {
        setConversionBrl(data);
      }
    }

    loadConvertion();
  }, [amount, currency]);

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
      <LabelText>
        Quantidade:{' '}
        <Amount>
          {currency[0]} {amount}
        </Amount>
      </LabelText>
      <ExchangeInput
        inlineImageLeft="search_icon"
        keyboardType="numeric"
        onChangeText={e => handleSetAmount(e)}
        value={amount.toString()}
      />
      <ExchangeButton onPress={handleExchangeCurrency}>
        <ExchangeButtonText>Inverter</ExchangeButtonText>
      </ExchangeButton>
      <LabelText>
        Vale:{' '}
        <Amount>
          {currency[1]} {handleConvertionResult()}
        </Amount>
      </LabelText>
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
    </HomeContainer>
  );
}

renderItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

Home.navigationOptions = {
  title: 'Nz for Brazilians',
  headerStyle: {
    backgroundColor: '#ED6A5A',
  },
  headerTintColor: '#F5F7DC',
};
