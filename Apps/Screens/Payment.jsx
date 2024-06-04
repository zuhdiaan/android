import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { WebView } from 'react-native-webview';

export default function Payment({ route }) {
  const { itemCounts, menuItems } = route.params;
  const [totalPrice, setTotalPrice] = useState(0);
  const [transactionToken, setTransactionToken] = useState(null);
  const [orderDate, setOrderDate] = useState('');

  useEffect(() => {
    let total = 0;
    for (const item of menuItems) {
      const itemPrice = parseFloat(item.price);
      total += itemCounts[item.id] * itemPrice;
    }
    setTotalPrice(isNaN(total) ? 0 : total);
  }, [itemCounts, menuItems]);

  const formatDateToLocal = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
  };

  const placeOrder = async () => {
    try {
      const formattedTotalPrice = totalPrice.toFixed(2);
      console.log('Formatted Total Price:', formattedTotalPrice);
  
      const orderedItems = menuItems
        .filter(item => itemCounts[item.id] > 0)
        .map(item => ({
          id: item.id,
          name: item.name,
          price: parseFloat(item.price),
          quantity: itemCounts[item.id]
        }));
  
      const response = await axios.post('http://10.0.2.2:3000/api/order', {
        orderId: `order-${Date.now()}`,
        grossAmount: formattedTotalPrice,
        customerDetails: {
          first_name: 'Customer',
          email: 'customer@example.com',
          phone: '08123456789'
        },
        orderedItems
      });

      const formattedOrderDate = formatDateToLocal(response.data.orderDate);
      setOrderDate(formattedOrderDate);
      setTransactionToken(response.data.transactionToken);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  if (transactionToken) {
    return (
      <WebView
        source={{ uri: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${transactionToken}` }}
        onNavigationStateChange={(state) => {
          if (state.url.includes('transaction_status')) {
            // Handle the payment status
          }
        }}
      />
    );
  }

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
        {/* <TouchableOpacity style={styles.methodeContainer} onPress={() => console.log('click2')}> */}
        {/* <View style={styles.methodeTextContainer}>
            <Text style={styles.methodeText}>Payment Methods</Text>
            <View style={styles.methodeText2Container}>
            <Text style={styles.methodeText2}>...</Text>
            </View> */}
        {/* </View> */}
        {/* </TouchableOpacity> */}
      <View style={styles.paymentContainer}>
        <TouchableOpacity style={styles.paymentButton} onPress={placeOrder}>
          <Text style={styles.buttonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
      {orderDate && (
        <Text style={styles.orderDateText}>Order Date: {orderDate}</Text>
      )}
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
