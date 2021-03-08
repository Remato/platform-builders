import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';

const Location = createStackNavigator();

const LocationRoutes: React.FC = () => (
  <Location.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#666' },
    }}
  >
    <Location.Screen name="Home" component={Home} />
  </Location.Navigator>
);

export default LocationRoutes;
