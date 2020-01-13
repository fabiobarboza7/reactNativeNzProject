import styled from 'styled-components/native';

export const WeekJobTitle = styled.Text`
  margin-bottom: 10px;
  color: #202c39;
  font-weight: bold;
`;

export const WeekJobCard = styled.TouchableHighlight`
  border-radius: 10px;
  min-height: 150px;
  background-color: #ed6a5a;
  justify-content: center;
  border: 1.5px dotted #ed6a5a;
`;

export const WeekJobBody = styled.View`
  min-height: 150px;
  border-radius: 4px;
  margin: 5px 10px;
  padding: 5px 10px;
  background-color: #fbfff1;
  color: #202c39;
`;

export const WeekjobImage = styled.Image`
  flex: 1;
  width: auto;
`;

export const WeekJobDescription = styled.Text.attrs({
  numberOfLines: 3,
  ellipsizeMode: 'tail',
})`
  color: grey;
`;

export const WeekjobSalary = styled.Text`
  margin: 5px 10px;
  font-weight: bold;
  font-size: 15px;
  color: #f5f7dc;
`;

export const WeekjobApply = styled.Text`
  margin: 5px 10px;
  font-weight: bold;
  font-size: 15px;
  color: #ffff82;
`;
