import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const PaymentSuccess = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId, name, balance } = route.params;

  const handleBackToDashboard = () => {
    navigation.navigate('Dashboard', { userId, name, balance });
  };

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
