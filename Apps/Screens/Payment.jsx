import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import moment from 'moment';

export default function Payment({ navigation, route }) {
  const { itemCounts, menuItems, userId, name, balance } = route.params;
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderTime, setOrderTime] = useState('');

  useEffect(() => {
    let total = 0;
    for (const item of menuItems) {
      const itemPrice = parseFloat(item.price);
      total += itemCounts[item.id] * itemPrice;
    }
    setTotalPrice(isNaN(total) ? 0 : total);
  }, [itemCounts, menuItems]);

  useEffect(() => {
    setOrderTime(moment().format('HH-mm-ss'));
  }, []);

  const placeOrder = async () => {
    try {
      // Check if the user's balance is sufficient
      if (balance < totalPrice) {
        Alert.alert('Error', 'Insufficient balance');
        return;
      }
  
      // Generate the order ID with the format ORDATE-1, ORDATE-2, and so on
      const currentDate = moment().format('DDMMYY');
      const orderId = `OR${currentDate}`;
  
      // Send the order details to your backend
      const orderedItems = menuItems
        .filter(item => itemCounts[item.id] > 0)
        .map(item => ({
          item_id: item.id,
          item_name: item.name,
          quantity: itemCounts[item.id],
          item_price: parseFloat(item.price),
          total_price: parseFloat(item.price) * itemCounts[item.id]
        }));

      const orderData = {
        orderId,
        orderDate: new Date().toISOString(),
        orderedItems,
        userId,
        name // Include the user's name
      };

      console.log('Order Data:', orderData);

      const orderResponse = await axios.post('http://10.0.2.2:3000/api/order', orderData);

      console.log('Order Response:', orderResponse.data);

      // Handle the responses from your backend
      if (orderResponse.status === 200) {
        // Deduct the total price from the user's balance
        const newBalance = balance - totalPrice;

        // Update the user's balance in your backend
        const balanceResponse = await axios.post('http://10.0.2.2:3000/api/updateBalance', { userId, newBalance });

        console.log('Balance Response:', balanceResponse.data);

        if (balanceResponse.status === 200) {
          setOrderTime(new Date().toLocaleString());
          Alert.alert('Success', 'Order placed successfully', [
            {
              text: 'OK',
              onPress: () => navigation.navigate('PaymentSuccess', { userId, name, balance })
            },
          ]);
        } else {
          Alert.alert('Error', 'Failed to update balance');
        }
      } else {
        Alert.alert('Error', 'Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      Alert.alert('Error', 'Failed to place order');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Items</Text>
      <ScrollView style={styles.itemList}>
        {menuItems.map((item) => {
          const quantity = itemCounts[item.id] || 0;
          if (quantity > 0) {
            const itemPrice = parseFloat(item.price);
            const itemTotalPrice = itemPrice * (itemCounts[item.id] || 0);
            return (
              <View key={item.id} style={styles.item}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.itemText}>{`Rp. ${item.price} x ${quantity}`}</Text>
                </View>
                <Text style={styles.itemText2}>{`Rp. ${itemTotalPrice.toLocaleString('id-ID')}`}</Text>
              </View>
            );
          }
          return null;
        })}
      </ScrollView>
      <View style={styles.totalContainer}>
        <Text style={styles.total}>Total: Rp. {totalPrice.toLocaleString('id-ID')}</Text>
      </View>
      <View style={styles.paymentContainer}>
        <TouchableOpacity style={styles.paymentButton} onPress={placeOrder}>
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
    padding: 5,
    marginBottom: 170,
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
    position: 'absolute',
    // alignContent: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 610,
    borderRadius: 50,
    padding: 20,
    paddingHorizontal: 85,
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