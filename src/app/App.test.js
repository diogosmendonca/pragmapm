import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {store} from '../store'
import { Provider } from 'react-redux'

test('Renderiza a app', () => {
  const { getByText } = render(
    <Provider store={store}>
    <App />
    </Provider>
  );
  const labelElement = getByText(/PragmaPM/i);
  expect(labelElement).toBeInTheDocument();
});
