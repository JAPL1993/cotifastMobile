import React from 'react';
import { NativeBaseProvider, Box, Text } from "native-base";
import LottieView from 'lottie-react-native';

export default function Loader() {
    return (
        <>

            <Box flex={1} alignItems='center' justifyContent={'center'}>
                <LottieView source={require('../assets/loader8.json')} autoPlay loop />
            </Box>

        </>
    );
}
