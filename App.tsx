import React from 'react';
import { NativeBaseProvider } from "native-base";
import 'react-native-gesture-handler';
import storeF from './store/store';
import { Provider } from 'react-redux';
import Layout from './components/Layout';


export default function App() {

  return (

    <NativeBaseProvider>
      <Provider store={storeF}>
        <Layout />
      </Provider>
    </NativeBaseProvider>

  );
}
