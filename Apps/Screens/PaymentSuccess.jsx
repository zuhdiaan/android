import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

const PaymentSuccess = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId, name, balance } = route.params;
  const [userBalance, setUserBalance] = useState(balance);

  const fetchUpdatedBalance = async (userId) => {
    try {
      const response = await fetch(`http://10.0.2.2:3000/api/balance?userId=${userId}`);
      const data = await response.json();
      if (response.ok) {
        setUserBalance(data.balance);
        return data.balance;
      } else {
        Alert.alert('Error', data.error || 'Failed to fetch balance');
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
      Alert.alert('Error', 'Failed to fetch balance');
    }
  };

  const handleBackToDashboard = () => {
    navigation.navigate('Dashboard', { userId, name, balance: userBalance });
  };

  useFocusEffect(
    useCallback(() => {
      const fetchBalance = async () => {
        const updatedBalance = await fetchUpdatedBalance(userId);
        route.params.balance = updatedBalance;
      };

      fetchBalance();
    }, [userId])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.successText}>Payment Success!</Text>
      <Text style={styles.messageText}>Thanks for the Payment, Please wait for your order to arrive!</Text>
      <TouchableOpacity style={styles.button} onPress={handleBackToDashboard}>
        <Text style={styles.buttonText}>Back To Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#19301B', // Green background color
    padding: 16,
  },
  successText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff', // White color
    marginBottom: 16,
  },
  messageText: {
    fontSize: 12,
    color: '#838383', // 838383 color
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ffffff', // 19301B background color
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 40,
  },
  buttonText: {
    fontSize: 16,
    color: '#19301B', // White color
    textAlign: 'center',
  },
});

export default PaymentSuccess;
