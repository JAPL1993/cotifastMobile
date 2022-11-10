import React, { useState, useEffect } from 'react';
import { Box, Text, FlatList, Heading, HStack, VStack, Spacer, AspectRatio, Image, Center, Stack } from "native-base";
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
            <FlatList horizontal={true} ref={flatListRef} data={pokeData} renderItem={({
                item
            }) => <Box marginX={2} maxW="80" maxH='auto' rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700"
            }} _web={{
                shadow: 2,
                borderWidth: 0
            }} _light={{
                backgroundColor: "gray.50"
            }}>
                    <Box>
                        <AspectRatio w="100%" ratio={16 / 9}>
                            <Image source={{
                                uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
                            }} alt="image" />
                        </AspectRatio>
                        <Center bg="violet.500" _dark={{
                            bg: "violet.400"
                        }} _text={{
                            color: "warmGray.50",
                            fontWeight: "700",
                            fontSize: "xs"
                        }} position="absolute" bottom="0" px="3" py="1.5">
                            Pokemon
                        </Center>
                    </Box>
                    <Stack p="4" space={3}>
                        <Stack space={2}>
                            <Heading size="md" ml="-1">
                                {item.name}
                            </Heading>
                            <Text fontSize="xs" _light={{
                                color: "violet.500"
                            }} _dark={{
                                color: "violet.400"
                            }} fontWeight="500" ml="-0.5" mt="-1">
                                Poke Api v2.
                            </Text>
                        </Stack>
                        <Text fontWeight="400">
                            {item.url}
                        </Text>
                        <HStack alignItems="center" space={4} justifyContent="space-between">
                            <HStack alignItems="center">
                                <Text color="coolGray.600" _dark={{
                                    color: "warmGray.200"
                                }} fontWeight="400">
                                    6 mins ago
                                </Text>
                            </HStack>
                        </HStack>
                    </Stack>
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