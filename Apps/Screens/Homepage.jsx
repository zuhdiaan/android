import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import React from 'react';
import Login from './Login';

export default function Homepage() {
  const navigation = useNavigation();

  const goToNextScreen = () => {
    navigation.navigate(Login);
  };

  return (
    <View style={styles.container}>
      <Image source={require("./../../assets/images/homepage.jpg")} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.welcomeText}>Welcome To Jiwani Coffee</Text>
        <Text style={styles.subtitle}>What would you like to have today?</Text>
        <TouchableOpacity style={styles.button} onPress={goToNextScreen}>
          <Text style={styles.buttonText}>Start Ordering</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#19301B',
  },
  image: {
    width: '100%',
    height: 600,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 40,
    backgroundColor: 'white',
    marginTop: 5,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 100,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: 'slategray',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#19301B',
    padding: 12,
    borderRadius: 25,
    marginTop: 50,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
});
