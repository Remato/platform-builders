import 'react-native-gesture-handler';

import React from 'react';

import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// Locations routes
import Routes from './routes';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#666" />
      <View style={{ backgroundColor: '#666' }} />
      <Routes />
    </NavigationContainer>
  );
};

export default App;
