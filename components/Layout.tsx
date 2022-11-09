import React from 'react';
import { SafeAreaView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import Loader from './Loader';
import List from '../views/List';


export default () => {
    const isLoading = useSelector((state: any) => state.loader.isLoading)
    return (
        <>
            <SafeAreaView>
                <List />
            </SafeAreaView>
            {
                isLoading && <Loader></Loader>
            }
        </>
    );
}