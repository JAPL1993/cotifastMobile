import React from 'react';
import { SafeAreaView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import Loader from './Loader';
import List from '../views/List';
import Weather from '../views/Weather';

export default () => {
    const isLoading = useSelector((state: any) => state.loader.isLoading)
    return (
        <>
            <SafeAreaView style={{
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Weather />
            </SafeAreaView>
            {
                isLoading && <Loader></Loader>
            }
        </>
    );
}