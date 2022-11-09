import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Box, Text, FlatList, Heading, HStack, VStack, Avatar, Spacer } from "native-base";
import 'react-native-gesture-handler';
import { colorSchema } from "./enums/colorSchema";
import LottieView from 'lottie-react-native';
import Loader from './components/Loader';

export default function App() {
  const [offset, setOffset] = useState<number>(0);
  const [pokeData, setPokeData] = useState<any[]>([]);
  const [isLoadign, setIsloadig] = useState<boolean>(true);
  useEffect(() => {
    setIsloadig(true)
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=50&offset=${offset}`, {
      method: 'GET'
    }).then((response) => response.json())
      .then((json) => {
        const res = json.results;
        setPokeData(old => [...old, ...res])
        setIsloadig(false)
      })
      .catch((e) => {
        console.log(e);
      });
  }, [offset]);
  const handleData = () => {
    setOffset(offset + 50)
  }
  return (
    <>
      <NativeBaseProvider >
        {
          isLoadign
            ? <Loader></Loader>
            : <Box p={10}>
              <Heading fontSize="xl" p="1" pb="10">
                Inbox
              </Heading>
              <FlatList initialScrollIndex={offset} data={pokeData} renderItem={({
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
                </Box>} keyExtractor={item => item.id} marginBottom="30" onEndReachedThreshold={0} onEndReached={handleData}

                onScrollToIndexFailed={({ index }) => { console.log(index) }}

              />
            </Box>
        }
      </NativeBaseProvider>
    </>
  );
}
