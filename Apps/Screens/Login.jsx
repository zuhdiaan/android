import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard, Platform } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [keyboardIsShown, setKeyboardIsShown] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsShown(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsShown(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:3000/api/login', { username, password });
      if (response.data.success) {
        Alert.alert('Success', 'Login successful');
        const { userId, name, balance } = response.data;
        navigation.navigate('Dashboard', { userId, name, balance });
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'Login failed');
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      extraScrollHeight={keyboardIsShown ? 100 : 0}
      enableOnAndroid={true}
    >
      <Image source={require("./../../assets/images/homepage.jpg")} style={styles.image} />
      <View style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              autoCapitalize="none"
              value={username}
              onChangeText={text => setUsername(text)}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              secureTextEntry={true}
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text style={styles.registerPrompt}>Don't have an account?</Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.registerText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#19301B',
  },
  image: {
    width: '100%',
    height: 600,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 30,
    backgroundColor: 'white',
    marginTop: -25,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 100,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 5,
  },
  label: {
    fontSize: 20,
    fontWeight: '700',
    color: '#19301B',
    marginBottom: 5,
  },
  inputView: {
    width: '100%',
    backgroundColor: '#D9D9D9',
    borderRadius: 25,
    height: 45,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  inputText: {
    height: 45,
    color: '#19301B',
  },
  button: {
    backgroundColor: '#19301B',
    padding: 12,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  forgotText: {
    color: '#19301B',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
  },
  registerPrompt: {
    color: '#19301B',
    fontSize: 14,
  },
  registerText: {
    color: '#19301B',
    fontSize: 16,
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
});
