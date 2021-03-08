import React, { useEffect, useCallback, useState } from 'react';
import { PermissionsAndroid, Alert, Platform } from 'react-native';

import Geolocation from 'react-native-geolocation-service';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import logoImg from '../../assets/logo.png';

import weatherApi from '../../services/weatherApi';
import reverseGeolocationApi from '../../services/reverseGeolocationApi';

import {
  Container,
  Logo,
  CardView,
  TitleInfo,
  TextInfo,
  WeatherStatus,
  WeatherDisplay,
  UpdateButton,
  UpdateButtonText,
  Loading,
} from './styles';

interface WeatherDescription {
  main: string;
  description: string;
}

interface WeatherResponse {
  id: number;
  name: string;
  wind: {
    speed: number;
  };
  sys: {
    id: number;
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: WeatherDescription[];
}

interface ReverseGeolocationResponse {
  address: {
    city: string;
    country: string;
    country_code: string;
    county: string;
    postcode: number;
    road: string;
    state: string;
    suburb: string;
  };
  lat: number;
  lon: number;
}

const Home: React.FC = () => {
  const [reverseLocation, setReverseLocation] = useState(
    {} as ReverseGeolocationResponse,
  );
  const [climateData, setClimateData] = useState({} as WeatherResponse);

  useEffect(() => {
    async function requestLocationPermissions() {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permissão de localização',
          message: `Permite que "Builders" acesse sua localização enquanto usa o aplicativo?`,
          buttonNeutral: 'Me pergunte depois',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    if (
      Platform.OS === 'ios' ||
      (requestLocationPermissions() && Platform.OS === 'android')
    ) {
      Geolocation.getCurrentPosition(
        position => {
          reverseGeolocationApi
            .get('', {
              params: {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
              },
            })
            .then(response => {
              setReverseLocation(response.data);
            });

          weatherApi
            .get('', {
              params: {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
              },
            })
            .then(response => {
              setClimateData(response.data);
            });
        },
        () => {
          Alert.alert(
            'Erro ao solicitar locazição',
            'Por favor permita o aplicativo à utilizar sua localização',
            [{ text: 'Cancelar' }, { text: 'OK' }],
            { cancelable: false },
          );
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  }, []);

  const handleRefresh = useCallback(() => {
    async function requestLocationPermissions() {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permissão de localização',
          message: `Permite que "Builders" acesse sua localização enquanto usa o aplicativo?`,
          buttonNeutral: 'Me pergunte depois',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    if (
      Platform.OS === 'ios' ||
      (requestLocationPermissions() && Platform.OS === 'android')
    ) {
      Geolocation.getCurrentPosition(
        position => {
          reverseGeolocationApi
            .get('', {
              params: {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
              },
            })
            .then(response => {
              setReverseLocation(response.data);
            });

          weatherApi
            .get('', {
              params: {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
              },
            })
            .then(response => {
              setClimateData(response.data);
            });
        },
        () => {
          Alert.alert(
            'Erro ao solicitar locazição',
            'Por favor permita o aplicativo à utilizar sua localização',
            [{ text: 'Cancelar' }, { text: 'OK' }],
            { cancelable: false },
          );
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  }, []);

  return (
    <Container>
      <Logo source={logoImg} />

      {Object.keys(climateData).length !== 0 &&
      Object.keys(reverseLocation).length !== 0 ? (
        <CardView>
          <TitleInfo style={{ fontSize: 25 }}>Localização Atual</TitleInfo>
          <TextInfo>
            {reverseLocation.address.country} - {reverseLocation.address.city}
            {'\n'}
            Latitude: {reverseLocation.lat}
            {'\n'}
            Longitude: {reverseLocation.lon}
          </TextInfo>

          <TitleInfo style={{ fontSize: 25 }}>Endereço</TitleInfo>
          <TextInfo>
            {reverseLocation.address.road}, {reverseLocation.address.suburb}{' '}
            CEP: {reverseLocation.address.postcode}
          </TextInfo>

          <TitleInfo style={{ fontSize: 25 }}>Clima</TitleInfo>
          <WeatherStatus>
            <WeatherDisplay>
              <Icon name="temperature-celsius" size={50} color="#fff" />
              <TitleInfo>{climateData.main.temp} Graus</TitleInfo>
            </WeatherDisplay>

            <WeatherDisplay>
              <Icon name="weather-windy" size={50} color="#fff" />
              <TitleInfo>{climateData.wind.speed} Km/h</TitleInfo>
            </WeatherDisplay>

            <WeatherDisplay>
              <Icon name="water" size={50} color="#fff" />
              <TitleInfo>{climateData.main.humidity} Kg/m³</TitleInfo>
            </WeatherDisplay>
          </WeatherStatus>
        </CardView>
      ) : (
        <Loading>CARREGANDO DADOS...</Loading>
      )}

      <UpdateButton onPress={handleRefresh}>
        <UpdateButtonText>
          Atualizar localização
          <Icon name="autorenew" size={25} color="#000" />
        </UpdateButtonText>
      </UpdateButton>
    </Container>
  );
};

export default Home;
