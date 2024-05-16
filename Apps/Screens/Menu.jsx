import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, FlatList, ScrollView } from 'react-native';
import { debounce } from 'lodash';
import Magnifier from "./../../assets/images/magnifier.png";

export default function Menu () {
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

const CategoryItem = ({ name, onPress }) => {
  return (
    <TouchableOpacity style={styles.categoryItem} onPress={() => onPress(name)}>
      <Text style={styles.categoryText}>{name}</Text>
    </TouchableOpacity>
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
    <View style={styles.paymentContainer}>
    <TouchableOpacity style={styles.paymentButton}>
      <Text style={styles.buttonText}>Choose Payment Method</Text>
    </TouchableOpacity>
    </View>
  );
};

const CategoryList = () => {
  const categories = [
  { name: 'All' },
  { name: 'Coffee' },
  { name: 'Non Coffee' },
  { name: 'Eat-ables' },
];

const handleCategoryPress = (category) => {
    console.log(`${category} pressed`);
  };

const menuItems = [
  { name: 'Space To Create', price: 'Rp. 25,000' },
  { name: 'Americano', price: 'Rp. 20,000' },
  { name: 'Chicken Chop', price: 'Rp. 53,000' },
  { name: 'Jiwani Aren', price: 'Rp. 24.000'},
  { name: 'Ayam Sambal Matah', price: 'Rp. 46.000'},
  { name: 'Kopi Susu Jiwani', price: 'Rp. 23.000'},

];

  return (
    <View style={styles.container}>
      <SearchBar />
      <ScrollView style={styles.menuContainer}>
        <View style={styles.CategoryList}>
      {categories.map((item, index) => (
        <CategoryItem key={index.toString()} name={item.name} onPress={handleCategoryPress} />
        ))}
        </View>
      {menuItems.map((item, index) => (
            <MenuItem
              key={index.toString()}
              name={item.name}
              price={item.price}
              onAdd={() => console.log('Add item')}
            />
          ))}
      </ScrollView>
      <PaymentButton />
    </View>
  );
};
return <CategoryList />;
}

const styles = StyleSheet.create({
  container: {
    position: "fixed",
    flex: 1,
    padding: 10,
    paddingBottom: 20,
    backgroundColor: '#19301B',
  },
  search: {
    backgroundColor: '#FFFFFF',
    opacity: 0.7,
    borderRadius: 50,
    padding: 10,
    marginTop: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontWeight: '300',
    color: '#000000',
    opacity: 0.7,
  },
  categoryItem: {
    backgroundColor: "#D9D9D9",
    opacity: 0.7, 
    padding:  10,
    paddingHorizontal: 20,
    borderRadius: 17,
    marginHorizontal: 5,
    height: 40,
  },
  categoryText: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
  },
  CategoryList: {
    marginVertical: 10,
    flexDirection: "row",
  },
  menuContainer: {
    width: '100%',
    // marginBottom: -300,
  },
  menuItem: {
    alignSelf: 'stretch',
    backgroundColor: '#D9D9D9',
    opacity: 0.3,
    padding: 50,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',},
  addButton: {
    backgroundColor: '#D9D9D9',
    opacity: 0.5,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'light',
    textAlign: 'center',
  },
  paymentButton: {
    backgroundColor: '#19301B',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '90%',
    alignSelf: "center",
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentContainer:{
  position: "fixed",
  backgroundColor: "#FFFFFF",
  padding: 20,
  width: 410,
  alignSelf: "center",
  // borderBottomEndRadius: 50,
  // borderBottomStartRadius: 50,
  borderTopStartRadius: 50,
  borderTopEndRadius: 50,
  // borderBottomEndRadius: 50,
  },
});
