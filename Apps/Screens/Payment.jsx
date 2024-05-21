import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Payment({ route }) {
  const { itemCounts, menuItems } = route.params;
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    for (const item of menuItems) {
      total += itemCounts[item.id] * parseFloat(item.price.replace('Rp. ', '').replace(',', ''));
    }
    setTotalPrice(total);
  }, [itemCounts, menuItems]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Details</Text>
      <View style={styles.itemList}>
        {menuItems.map((item) => {
          const quantity = itemCounts[item.id] || 0;
          if (quantity > 0) {
            return (
              <View key={item.id} style={styles.item}>
                <Text>{item.name}</Text>
                <Text>{`Rp. ${item.price.toLocaleString('id-ID')} x ${quantity}`}</Text>
              </View>
            );
          }
          return null;
        })}
      </View>
      <Text style={styles.total}>Total: Rp. {totalPrice.toLocaleString('id-ID')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemList: {
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
