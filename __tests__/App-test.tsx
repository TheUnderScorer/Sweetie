import React from 'react';
import App from '../src/App';

// Note: test renderer must be required after react-native.
import { render } from '@testing-library/react-native';

it('renders correctly', () => {
  render(<App />);
});
