import React from 'react';
import { render } from '@testing-library/react-native';
import Home from '../../src/pages/Home';

jest.mock('react-native-geolocation-service', () => {
  return {
    getCurrentPosition: jest.fn(),
  };
});

jest.mock('react-native-gesture-handler', () => {
  return {
    RectButton: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Home Page', () => {
  it('should be able to home', () => {
    const { debug } = render(<Home />);

    debug();
  });
});
