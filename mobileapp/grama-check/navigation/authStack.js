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
        <Stack.Screen
          name='NewRequestScreen'
          component={Screens.NewRequestScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='ChooseOptionScreen'
          component={Screens.ChooseOptionScreen}
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
          name='SignInScreen'
          component={Screens.SignInScreen}
          options={{
            headerShown: false,
          }}
        /> */}
        <Stack.Screen
          name='RequestStatusScreen'
          component={Screens.RequestStatusScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='MessageScreen'
          component={Screens.MessageScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
