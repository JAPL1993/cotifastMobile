import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../store/states/loading/loading';
import * as Location from 'expo-location';
import { Box, Text, FlatList, Heading, HStack, VStack, Spacer, AspectRatio, Image, Center, Stack } from "native-base";

export default () => {
    const [location, setLocation] = useState<any>();
    const [errorMsg, setErrorMsg] = useState<string>();
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            dispatch(setLoading(true))
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=0dce50c0d3b80ebc23cbfd3e53fcb173`, {
                method: 'GET'
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                })
                .catch((e) => console.log(e.msg))
            dispatch(setLoading(false))
        })();
    }, []);
    return (
        <Text>El coso</Text>
    );
}