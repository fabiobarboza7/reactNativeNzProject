import styled from 'styled-components/native';
import SaveIcon from 'react-native-vector-icons/MaterialIcons';

export const WeekJobTitle = styled.Text`
  margin-bottom: 10px;
  color: #202c39;
  font-weight: bold;
`;

export const WeekJobCard = styled.TouchableHighlight`
  min-height: 150px;
`;

export const WeekJobBody = styled.View`
  min-height: 170px;
  padding: 10px 10px;
  background-color: #fff;
  color: #202c39;
  justify-content: center;
  align-items: flex-start;
`;

export const WeekjobImage = styled.Image`
  flex: 1;
  width: 100%;
  margin: 0 auto;
`;

export const WeekJobDescription = styled.Text.attrs({
  numberOfLines: 2,
  ellipsizeMode: 'tail',
})`
  color: grey;
`;

export const WeekjobSalary = styled.Text`
  font-weight: bold;
  color: #f5b841;
`;

export const WeekjobApply = styled.Text`
  font-weight: bold;

  color: #f5f7dc;
`;

export const WeekJobDefaultLogo = styled.Image`
  margin: 0 auto;
`;

export const WeekJobInfo = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 10px;
  background-color: #343434;
`;

export const WeekJobSaveIcon = styled(SaveIcon).attrs(({ isFavorite }) => ({
  name: isFavorite ? 'favorite' : 'favorite-border',
  size: 40,
}))`
  color: ${({ isFavorite }) => (isFavorite ? '#F5B841' : '#fff')};
`;

export const WeekJobRemoveLocal = styled(SaveIcon).attrs(() => ({
  name: 'delete-forever',
  size: 40,
}))`
  color: #ed6a5a;
`;

export const WeekSalaryBox = styled.View``;
