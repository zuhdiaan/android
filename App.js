import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import Homepage from './Apps/Screens/Homepage';
import Menu from './Apps/Screens/Menu';
import Payment from './Apps/Screens/Payment';
import Login from './Apps/Screens/Login';
import Register from './Apps/Screens/Register';
import ForgotPassword from './Apps/Screens/ForgotPassword';
import Dashboard from './Apps/Screens/Dashboard';
import PaymentSuccess from './Apps/Screens/PaymentSuccess';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Homepage">
        <Stack.Screen name="Homepage" component={Homepage} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }}/>
        <Stack.Screen name="Payment" component={Payment} options={{ title: "Order Summary", headerTitleAlign: 'center', headerTitleStyle: {fontSize: 24, color: '#FFFFFF', fontWeight: 'bold' }, headerStyle: { backgroundColor: "#19301B"}, headerTintColor: '#FFFFFF'}}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
