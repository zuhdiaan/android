import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function Dashboard({ navigation, route }) {
  const { userId, name, balance } = route.params;
  const [userBalance, setUserBalance] = useState(balance);

  useFocusEffect(
    React.useCallback(() => {
      const fetchBalance = async () => {
        try {
          const response = await fetch(`http://10.0.2.2:3000/api/balance?userId=${userId}`);
          const data = await response.json();
          setUserBalance(data.balance);
        } catch (error) {
          console.error('Error fetching balance:', error);
          Alert.alert('Error', 'Failed to fetch balance');
        }
      };

      fetchBalance();
    }, [userId])
  );

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome, {name}!</Text>
        <Text style={styles.balanceText}>Your Balance is <Text style={styles.balanceAmount}>{userBalance}</Text></Text>
        <Text style={styles.topUpText}>Please top up at the cashier</Text>
      </View>
      <TouchableOpacity style={styles.menuBtn} onPress={() => navigation.navigate('Menu', { userId, name, balance: userBalance })}>
        <Text style={styles.menuText}>Scan QR Code</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#19301B',
    padding: 20,
  },
  textContainer: {
    alignItems: 'flex-start',
  },
  welcomeText: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  balanceText: {
    fontSize: 20,
    color: '#838383',
  },
  balanceAmount: {
    color: '#838383',
    fontWeight: 'bold',
  },
  topUpText: {
    color: '#838383',
    marginBottom: 20,
  },
  menuBtn: {
    position: 'absolute',
    top: '50%',
    left: '15%',
    width: '80%',
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    color: '#19301B',
    fontWeight: 'bold',
    fontSize: 16,
  },  
});
