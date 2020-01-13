// https://coolors.co/ffff82-f5f7dc-b5d99c-ed6a5a-202c39
import styled from 'styled-components/native';

export const HomeContainer = styled.View`
  flex: 10;
  background-color: #202c39;
`;

export const CarouselContainer = styled.View`
  padding: 20px 0;
  background-color: #f5f7dc;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const HomeJobsTitle = styled.Text`
  padding: 10px 0;
  color: #ed6a5a;
  font-weight: bold;
`;

export const BoxDivisor = styled.View`
  margin-top: 30px;
`;

export const WeatherScrollView = styled.ScrollView`
  border-radius: 4px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #202c39;
  flex: 2;
`;

export const WeatherScrollBox = styled.View`
  margin: 5px 10px;
  border-radius: 4px;
  background-color: #fbfff1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
`;

export const WeatherScrollTemp = styled.View`
  justify-content: center;
  align-items: flex-start;
`;

export const WeatherScrollStatus = styled.View`
  justify-content: center;
  align-items: center;
`;

export const WeatherContainer = styled.View`
  flex: 1;
`;

export const WeatherText = styled.Text`
  color: #202c39;
`;

export const StrongText = styled.Text`
  color: #f5f7dc;
  font-weight: bold;
  padding-left: 10px;
`;

export const LabelText = styled.Text`
  color: #ab9df2;
`;

export const Amount = styled.Text`
  color: #493684;
  font-weight: bold;
`;

export const ExchangeInput = styled.TextInput`
  height: 40;
  border: 1px solid #ab9df2;
  border-radius: 4px;
  padding-left: 10px;
  color: #493684;
  margin-bottom: 5px;
`;

export const ExchangeButton = styled.TouchableHighlight`
  background-color: #ab9df2;
  padding: 7px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-bottom: 5px;
`;

export const ExchangeButtonText = styled.Text`
  color: #fbfff1;
`;
