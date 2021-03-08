import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;

  align-items: center;
  justify-content: center;
  padding: 0 30px;
`;

export const Logo = styled.Image``;

export const CardView = styled.View`
  flex: 0.8;
  width: 100%;

  justify-content: space-around;
  background: #000;
  border-radius: 10px;
  margin: 20px;
`;

export const TitleInfo = styled.Text`
  font-size: 16px;
  text-align: center;
  color: #fff;
  font-family: 'Montserrat-SemiBold';
`;

export const TextInfo = styled.Text`
  font-size: 18px;
  text-align: center;
  color: #fff;
  font-family: 'Montserrat-Regular';
`;

export const WeatherStatus = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const WeatherDisplay = styled.View``;

export const UpdateButton = styled(RectButton)`
  width: 100%;

  height: 60px;
  background: #fbca00;
  border-radius: 10px;

  justify-content: center;
  align-items: center;
`;

export const UpdateButtonText = styled.Text`
  font-size: 18px;
  font-family: 'Montserrat-SemiBold';
  color: #312e38;
`;

export const Loading = styled.Text`
  color: #000;
  font-size: 24px;
  font-family: 'Montserrat-SemiBold';
`;
