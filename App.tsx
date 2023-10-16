import React from 'react';
import Navigation from './src/navigation/navigation';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;