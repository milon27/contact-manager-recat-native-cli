import 'react-native-gesture-handler';
import React from 'react'
import AppNavContainer from './components/navigation/AppNavContainer';
import axios from 'axios'
import Define from './utils/helpers/Define';
import MainContext from './utils/context/MainContext';

//setup axios
axios.defaults.baseURL = Define.API_BASE_URL
axios.defaults.withCredentials = true

const App = () => {
  return (
    <MainContext>
      <AppNavContainer />
    </MainContext>
  );
};

export default App;
