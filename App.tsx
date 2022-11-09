import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Box, Text, FlatList, Heading, HStack, VStack, Avatar, Spacer } from "native-base";
import 'react-native-gesture-handler';
import Loader from './components/Loader';
import { FlatList as Fl, SafeAreaView } from 'react-native';
import storeF from './store/store';
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from './store/states/loading/loading';
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
