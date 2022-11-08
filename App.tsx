import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import 'react-native-gesture-handler';
import { Canvas, Fill, Box, BoxShadow, rrect, rect } from "@shopify/react-native-skia";
import { colorSchema } from "./enums/colorSchema";

export default function App() {
  const { width, height } = useWindowDimensions()
  return (
    <>
      <Canvas style={{ width, height, position: 'absolute' }}>
        <Fill color={colorSchema.main} />
        <Box box={rrect(rect(width / 2 - 64, 64, 128, 128), 24, 24)} color={colorSchema.main}>
          <BoxShadow dx={10} dy={10} blur={10} color={colorSchema.lShadow} inner />
          <BoxShadow dx={-10} dy={-10} blur={10} color={colorSchema.dShadow} inner />
          <BoxShadow dx={10} dy={10} blur={10} color={colorSchema.lShadow} />
          <BoxShadow dx={-10} dy={-10} blur={10} color={colorSchema.dShadow} />
        </Box>
        <Box box={rrect(rect(width / 2 - 64, height / 2 - 64, 128, 128), 100, 100)} color={colorSchema.main}>
          <BoxShadow dx={10} dy={10} blur={10} color={colorSchema.lShadow} inner />
          <BoxShadow dx={-10} dy={-10} blur={10} color={colorSchema.dShadow} inner />
          <BoxShadow dx={10} dy={10} blur={10} color={colorSchema.lShadow} />
          <BoxShadow dx={-10} dy={-10} blur={10} color={colorSchema.dShadow} />
        </Box>
      </Canvas>
    </>
  );
}
