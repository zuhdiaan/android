import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Payment({ route }) {
  const { itemCounts, menuItems } = route.params;
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    for (const item of menuItems) {
      const itemPrice = parseFloat(item.price.replace('Rp. ', '').replace('.', '').replace(',', ''));
      total += itemCounts[item.id] * itemPrice;
    }
    setTotalPrice(total);
  }, [itemCounts, menuItems]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Items</Text>
      <View style={styles.itemList}>
        {menuItems.map((item) => {
          const quantity = itemCounts[item.id] || 0;
          if (quantity > 0) {
            const itemPrice = parseFloat(item.price.replace('Rp. ', '').replace('.', '').replace(',', ''));
            const itemTotalPrice = itemPrice * (itemCounts[item.id] || 0);
            return (
              <View key={item.id} style={styles.item}>
                  <View style={styles.itemInfo}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemText}>{`${item.price} x ${quantity}`}</Text>
                  </View>
                <Text style={styles.itemText2}>{`Rp. ${itemTotalPrice.toLocaleString('id-ID')}`}</Text>
              </View>
            );
          }
          return null;
        })}
      </View>
      <View style={styles.totalContainer}>
      <Text style={styles.total}>Total: Rp. {totalPrice.toLocaleString('id-ID')}</Text>
      </View>
        <TouchableOpacity style={styles.methodeContainer} onPress={() => console.log('click2')}>
        <View style={styles.methodeTextContainer}>
            <Text style={styles.methodeText}>Payment Methods</Text>
            <View style={styles.methodeText2Container}>
            <Text style={styles.methodeText2}>...</Text>
            </View>
        </View>
        </TouchableOpacity>
      <View style={styles.paymentContainer}>
        <TouchableOpacity style={styles.paymentButton} onPress={() => console.log('click')}>
          <Text style={styles.buttonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
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
    color: "#19301B",
    marginBottom: 10,
  },
  itemList: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 20,
  },
  itemInfo: {
    flex: 1,
  },
  itemText: {
    marginBottom: 10,
    color: "#FFFFFF",
  },
  itemText2: {
    color: "#FFFFFF",
    marginLeft: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#1A3B21',
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  totalContainer: {
    marginTop: 180,
    borderRadius: 50,
    padding: 20,
    backgroundColor: '#375139',
  },
  total: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText: {
    color: '#19301B',
    fontSize: 18,
    textAlign: 'center',
  },
  paymentButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '90%',
    alignSelf: "center",
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentContainer: {
    position: "absolute",
    backgroundColor: "#19301B",
    padding: 20,
    width: 415,
    alignSelf: "center",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    marginTop: 710,
  },
  methodeTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  methodeText: {
    color: '#19301B',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
  },
  methodeText2Container: {
    backgroundColor: "#19301B",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodeText2: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
  },
  methodeButton: {
    backgroundColor: '#19301B',
    paddingHorizontal: 10,
    marginRight: 20,
    padding: 5,
    borderRadius: 150,
    alignSelf: "flex-end",
  },
  methodeContainer: {
    position: "absolute",
    backgroundColor: "#ACC1BA",
    padding: 10,
    width: 415,
    height: 150,
    alignSelf: "center",
    marginTop: 660,
  },
});
