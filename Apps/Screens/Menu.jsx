import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import Magnifier from "./../../assets/images/magnifier.png";
import STC from "./../../assets/images/STC.jpg";
import A from "./../../assets/images/A.jpg";
import ASM from "./../../assets/images/ASM.jpg";
import CC from "./../../assets/images/CC.jpg";
import CM from "./../../assets/images/CM.jpg";
import JA from "./../../assets/images/JA.jpg";

const menuItems = [
  { id: 1, name: 'Space To Create', price: 'Rp. 25,000', imageSource: STC, category: 'Coffee'},
  { id: 2, name: 'Americano', price: 'Rp. 20,000', imageSource: A, category: 'Coffee'},
  { id: 3, name: 'Chicken Chop', price: 'Rp. 53,000', imageSource: CC, category: 'Eat-ables'},
  { id: 4, name: 'Jiwani Aren', price: 'Rp. 24.000', imageSource: JA, category: 'Coffee'},
  { id: 5, name: 'Ayam Sambal Matah', price: 'Rp. 46.000', imageSource: ASM, category: 'Eat-ables'},
  { id: 6, name: 'Choco Mint', price: 'Rp. 29.000', imageSource: CM, category: 'Non Coffee'},
];

export default function Menu({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState(menuItems);
  const [itemCounts, setItemCounts] = useState(menuItems.reduce((acc, item) => {
    acc[item.id] = 0;
    return acc;
  }, {}));

  useEffect(() => {
    filterItems();
  }, [searchText]);

  const filterItems = () => {
    if (searchText === '') {
      setFilteredItems(menuItems);
    } else {
      const filtered = menuItems.filter(item => 
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };

  const incrementCount = (id) => {
    setItemCounts({ ...itemCounts, [id]: itemCounts[id] + 1 });
  };

  const decrementCount = (id) => {
    if (itemCounts[id] > 0) {
      setItemCounts({ ...itemCounts, [id]: itemCounts[id] - 1 });
    }
  };

  const resetCount = (id) => {
    setItemCounts({ ...itemCounts, [id]: 0 });
  };

  const SearchBar = ({ searchText, setSearchText }) => {
    return (
      <View style={styles.search}>
        <Image source={Magnifier} style={styles.magnifier} />
        <TextInput
          style={styles.title}
          placeholder='Search on Menu'
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
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

  const MenuItem = ({ item }) => {
    const quantity = itemCounts[item.id] || 0;

    return (
      <View style={styles.menuItem}>
        <Image source={item.imageSource} style={styles.menuImage} />
        <View style={styles.menuDetails}>
          <Text style={styles.menuText}>{item.name}</Text>
          <Text style={styles.priceText}>{item.price}</Text>
        </View>
        <View style={styles.addButton}>
          <TouchableOpacity style={styles.buttonText} onPress={() => decrementCount(item.id)}>
            <Text style={styles.buttonText}>-  </Text>
          </TouchableOpacity>
          <Text style={styles.buttonText}>{itemCounts[item.id]}</Text>
          <TouchableOpacity style={styles.buttonText} onPress={() => incrementCount(item.id)}>
            <Text style={styles.buttonText}> +</Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity style={styles.addButton} onPress={() => console.log('Add item')}>
          <Text style={styles.buttonText}>+Add</Text>
        </TouchableOpacity> */}
      </View>
    );
  };

  const PaymentButton = () => {
    return (
      <View style={styles.paymentContainer}>
        <TouchableOpacity style={styles.paymentButton} onPress={() => navigation.navigate('Payment', { itemCounts })}>
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
      if (category === 'All') {
        setFilteredItems(menuItems);
      } else {
        const filtered = menuItems.filter(item => item.category === category);
        setFilteredItems(filtered);
      }
    };

    return (
      <View style={styles.container}>
        <SearchBar searchText={searchText} setSearchText={setSearchText}/>
        <View style={styles.CategoryList}>
          {categories.map((item, index) => (
            <CategoryItem key={index.toString()} name={item.name} onPress={handleCategoryPress} />
          ))}
        </View>
        <ScrollView style={styles.menuContainer}>
          {filteredItems.map((item, index) => (
            <MenuItem key={index.toString()} item={item} />
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
    flex: 1,
    padding: 10,
    paddingBottom: -10,
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
    padding:  5,
    paddingHorizontal: 15,
    borderRadius: 17,
    marginHorizontal: 3,
    height: 30,
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
  },
  menuItem: {
    alignSelf: 'stretch',
    backgroundColor: '#395D50',
    padding: 50,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  menuImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  menuDetails: {
    flex: 1,
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
    flexDirection: 'row',
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
  borderTopStartRadius: 50,
  borderTopEndRadius: 50,
  },
});
