// https://coolors.co/ffff82-f5f7dc-b5d99c-ed6a5a-202c39 F5B841
import styled from 'styled-components/native';

export const HomeContainer = styled.View`
  background-color: #343434;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const HomeJobsTitle = styled.Text`
  padding: 30px 0 0 0;
  font-size: 20px;
  color: #ed6a5a;
  font-weight: bold;
`;

export const SearchJobTextInput = styled.TextInput.attrs({
  placeholder: '...search for a job title',
  placeholderTextColor: '#ed6a5a',
})`
  color: #fff;
  height: 40px;
  padding-left: 10px;
  border-radius: 4px;
  width: 80%;
  /* border: 0.5px solid #ed6a5a; */
  border-bottom-width: 0.5px;
  border-bottom-color: #ed6a5a;
  margin: 50px 0;
`;
