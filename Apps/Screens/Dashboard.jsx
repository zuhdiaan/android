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
      <Text style={styles.welcomeText}>Hello, {name}!</Text>
      <Text style={styles.balanceText}>Your Balance: {userBalance}</Text>
      <TouchableOpacity style={styles.topUpBtn} onPress={() => Alert.alert('Alert', 'Please top up at the cashier')}>
        <Text style={styles.topUpText}>Top Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuBtn} onPress={() => navigation.navigate('Menu', { userId, name, balance: userBalance })}>
        <Text style={styles.menuText}>Go to Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  balanceText: {
    fontSize: 20,
    marginBottom: 20,
  },
  topUpBtn: {
    width: '80%',
    height: 50,
    backgroundColor: '#19301B',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  topUpText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  menuBtn: {
    width: '80%',
    height: 50,
    backgroundColor: '#19301B',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  menuText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
