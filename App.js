import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import Homepage from './Apps/Screens/Homepage';
import Menu from './Apps/Screens/Menu';
import Payment from './Apps/Screens/Payment';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Homepage">
        <Stack.Screen name="Homepage" component={Homepage} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }}/>
        <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}