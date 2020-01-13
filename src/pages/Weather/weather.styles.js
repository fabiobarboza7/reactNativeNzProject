import styled from 'styled-components/native';

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
