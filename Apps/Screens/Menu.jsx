import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, FlatList } from 'react-native';
import { debounce } from 'lodash';
import Magnifier from "./../../assets/images/magnifier.png";

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = debounce((text) => {
    // perform search logic here
  }, 500);

  return (
    <View style={styles.search}>
      <Image source={Magnifier} style={styles.magnifier} />
      <TextInput
        style={styles.title}
        placeholder='Search on Menu'
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
          handleSearch(text);
        }}
      />
    </View>
  );
};

const CategoryItem = ({ name }) => {
  return (
    <View style={styles.categoryItem}>
      <Text style={styles.categoryText}>{name}</Text>
    </View>
  );
};

const MenuItem = ({ name, price, onAdd }) => {
  return (
    <View style={styles.menuItem}>
      <Text style={styles.menuText}>{name}</Text>
      <Text style={styles.priceText}>{price}</Text>
      <TouchableOpacity style={styles.addButton} onPress={onAdd}>
        <Text style={styles.buttonText}>+ Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const PaymentButton = () => {
  return (
    <TouchableOpacity style={styles.paymentButton}>
      <Text style={styles.buttonText}>Choose Payment Method</Text>
    </TouchableOpacity>
  );
};

const categories = [
  { name: 'All' },
  { name: 'Coffee' },
  { name: 'Non Coffee' },
  { name: 'Eat-ables' },
];

const menuItems = [
  { name: 'Space To Create', price: 'Rp. 25,000' },
  { name: 'Americano', price: 'Rp. 20,000' },
  { name: 'Chicken Chop', price: 'Rp. 53,000' },
];

export default function Menu() {
  return (
    <View style={styles.container}>
      <SearchBar />
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CategoryItem name={item.name} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.menuContainer}>
        <FlatList
          data={menuItems}
          renderItem={({ item }) => (
            <MenuItem name={item.name} price={item.price} onAdd={() => console.log('Add item')} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <PaymentButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#19301B',
  },
  search: {
    backgroundColor: '#FFFFFF',
    opacity: 0.7,
    borderRadius: 50,
    padding: 10,
    marginTop: 40,
    borderRadius: 50,
    justifyContent: 'center', // center child elements vertically
    alignItems: 'center', // center child elements horizontally
    flexDirection: 'row',
  },
  magnifier: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginLeft: -190,
  },
  title: {
    fontSize: 18,
    fontWeight: 'light',
    color: '#000000',
    opacity: 0.7,
  },
  menuContainer: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center', // center child elements horizontally
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',},
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  paymentButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});