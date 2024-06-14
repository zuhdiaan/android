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
      <Text style={styles.successText}>Pembayaran Berhasil!</Text>
      <Text style={styles.messageText}>Terima kasih telah melakukan pembayaran.</Text>
      <TouchableOpacity style={styles.button} onPress={handleBackToDashboard}>
        <Text style={styles.buttonText}>Kembali ke Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 16,
  },
  messageText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default PaymentSuccess;
