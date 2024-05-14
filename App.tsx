import React from 'react';
import AppContainer from './src/navigation/containers/app';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/app/store';

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;