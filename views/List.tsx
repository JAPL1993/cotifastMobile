import React, { useState, useEffect } from 'react';
import { Box, Text, FlatList, Heading, HStack, VStack, Spacer } from "native-base";
import { FlatList as Fl } from 'react-native';
import { useDispatch } from 'react-redux';
import { setLoading } from '../store/states/loading/loading'

export default () => {

    const [offset, setOffset] = useState<number>(0);
    const [pokeData, setPokeData] = useState<any[]>([]);
    const dispatch = useDispatch();
    const flatListRef = React.useRef<Fl>(null);


    let lazyLoadTimeOut: any = null;

    useEffect(() => {
        loadLazyData()
    }, [offset]);


    const loadLazyData = () => {
        dispatch(setLoading(true))
        if (lazyLoadTimeOut) {
            clearTimeout(lazyLoadTimeOut)
        }
        lazyLoadTimeOut = setTimeout(() => {
            fetch(`https://pokeapi.co/api/v2/pokemon/?limit=50&offset=${offset}`, {
                method: 'GET'
            }).then((response) => response.json())
                .then((json) => {
                    const res = json.results;
                    setPokeData(old => [...old, ...res])
                    dispatch(setLoading(false))
                })
                .catch((e) => {
                    console.log(e);
                });
        }, Math.random() * 1000 + 250);
    }


    const handleData = () => {
        setOffset(offset + 50)
    }


    return (
        <Box paddingLeft={5} paddingRight={5}>
            <Heading fontSize="xl" p="1" pb="10">
                Inbox
            </Heading>
            <FlatList ref={flatListRef} data={pokeData} renderItem={({
                item
            }) => <Box borderBottomWidth="5" _dark={{
                borderColor: "muted.50"
            }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
                    <HStack space={[2, 3]} justifyContent="space-between">
                        <VStack>
                            <Text _dark={{
                                color: "warmGray.50"
                            }} color="coolGray.800" bold>
                                {item.name}
                            </Text>
                            <Text color="coolGray.600" _dark={{
                                color: "warmGray.200"
                            }}>
                                {item.url}
                            </Text>
                        </VStack>
                        <Spacer />
                    </HStack>
                </Box>} keyExtractor={item => item.name} marginBottom="30" onEndReached={handleData}
                scrollEnabled={true}
                onScrollToIndexFailed={({ index, highestMeasuredFrameIndex, averageItemLength }) => {
                    console.log(index, 'index')
                    console.log(highestMeasuredFrameIndex, 'high')
                    console.log(averageItemLength, 'average')
                }}
            />
        </Box>
    );
}