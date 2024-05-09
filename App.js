  import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './Apps/Screens/LoginScreen';

export default function App() {
  return (
    <View className="flex-1 bg-white">
      {/* <Text className="text-[40px] text-red-400">Open up App.js to start working on your app!</Text> */}
      <StatusBar style="auto" />
      <LoginScreen/>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
