import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Screens from '../screens';
const Stack = createNativeStackNavigator();

export default function App(props) {
  return (
    <NavigationContainer>
      <StatusBar barStyle='dark-content' />
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: 'none' }}
      >
        <Stack.Screen
          name='StartScreen'
          component={Screens.StartScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
