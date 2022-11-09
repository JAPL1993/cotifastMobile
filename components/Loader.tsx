import React, { useRef } from 'react';
import { NativeBaseProvider, Box, Text } from "native-base";
import LottieView from 'lottie-react-native';
import { useWindowDimensions } from 'react-native'

export default function Loader() {
    const { width, height } = useWindowDimensions();
    return (
        <>
            <Box
                position={'absolute'}
                left={0}
                right={0}
                top={0}
                bottom={0}
                alignItems={'center'}
                justifyContent={'center'}
                zIndex={10}
                backgroundColor={'rgba(0,0,0,0.8)'}
            >
                <Box flex={1} alignItems='center' justifyContent={'center'}>
                    <LottieView source={require('../assets/pokemon.json')} autoPlay loop
                        style={{ width: width / 2, height: width / 2 }}
                    />
                </Box>
            </Box>
        </>
    );
}
