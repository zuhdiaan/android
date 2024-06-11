import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function Dashboard({ navigation, route }) {
  const { userId, name, balance } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Hello, {name}!</Text>
      <Text style={styles.balanceText}>Your Balance: {balance}</Text>
      <TouchableOpacity style={styles.topUpBtn} onPress={() => Alert.alert('Alert', 'Please top up at the cashier')}>
        <Text style={styles.topUpText}>Top Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuBtn} onPress={() => navigation.navigate('Menu', { userId, name, balance })}>
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
