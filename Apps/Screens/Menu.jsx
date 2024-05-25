import React, { useState, useEffect, useCallback, memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import debounce from 'lodash.debounce';
import Magnifier from "./../../assets/images/magnifier.png";
import STC from "./../../assets/images/STC.jpg";
import A from "./../../assets/images/A.jpg";
import ASM from "./../../assets/images/ASM.jpg";
import CC from "./../../assets/images/CC.jpg";
import CM from "./../../assets/images/CM.jpg";
import JA from "./../../assets/images/JA.jpg";

const menuItems = [
  { id: 1, name: 'Space To Create', price: 'Rp. 25,000', imageSource: STC, category: 'Coffee' },
  { id: 2, name: 'Americano', price: 'Rp. 20,000', imageSource: A, category: 'Coffee' },
  { id: 3, name: 'Chicken Chop', price: 'Rp. 53,000', imageSource: CC, category: 'Eat-ables' },
  { id: 4, name: 'Jiwani Aren', price: 'Rp. 24.000', imageSource: JA, category: 'Coffee' },
  { id: 5, name: 'Ayam Sambal Matah', price: 'Rp. 46.000', imageSource: ASM, category: 'Eat-ables' },
  { id: 6, name: 'Choco Mint', price: 'Rp. 29.000', imageSource: CM, category: 'Non Coffee' },
];

const debouncedFilterItems = debounce((text, setFilteredItems) => {
  if (text === '') {
    setFilteredItems(menuItems);
  } else {
    const filtered = menuItems.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredItems(filtered);
  }
}, 300);

const SearchBar = memo(({ searchText, setSearchText }) => {
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
});

const CategoryItem = memo(({ name, onPress, isSelected }) => {
  return (
    <TouchableOpacity
      style={[styles.categoryItem, isSelected && styles.selectedCategoryItem]}
      onPress={() => onPress(name)}
    >
      <Text style={[styles.categoryText, isSelected && styles.selectedCategoryText]}>{name}</Text>
    </TouchableOpacity>
  );
});

const MenuItem = memo(({ item, itemCounts, incrementCount, decrementCount }) => {
  const quantity = itemCounts[item.id] || 0;

  return (
    <View style={styles.menuItem}>
      <Image source={item.imageSource} style={styles.menuImage} />
      <View style={styles.menuDetailsContainer}>
        <View style={styles.menuDetails}>
          <Text style={styles.menuText}>{item.name}</Text>
          <Text style={styles.priceText}>{item.price}</Text>
        </View>
        <View style={styles.addButtonContainer}>
          {quantity === 0 ? (
            <TouchableOpacity style={styles.addButton} onPress={() => incrementCount(item.id)}>
              <Text style={styles.buttonText2}>+ Add</Text>
            </TouchableOpacity>
          ) : (
        <View style={styles.addButton}>
          <TouchableOpacity style={styles.buttonText} onPress={() => decrementCount(item.id)}>
            <Text style={styles.buttonText}>-  </Text>
          </TouchableOpacity>
          <Text style={styles.buttonText}>{quantity}</Text>
          <TouchableOpacity style={styles.buttonText} onPress={() => incrementCount(item.id)}>
            <Text style={styles.buttonText}>  +</Text>
          </TouchableOpacity>
        </View>
          )}
        </View>
      </View>
    </View>
  );
});

export default function Menu({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState(menuItems);
  const [itemCounts, setItemCounts] = useState(menuItems.reduce((acc, item) => {
    acc[item.id] = 0;
    return acc;
  }, {}));
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    debouncedFilterItems(searchText, setFilteredItems);
    return () => {
      debouncedFilterItems.cancel();
    };
  }, [searchText]);

  const incrementCount = useCallback((id) => {
    setItemCounts(prevCounts => ({ ...prevCounts, [id]: prevCounts[id] + 1 }));
  }, []);

  const decrementCount = useCallback((id) => {
    setItemCounts(prevCounts => {
      if (prevCounts[id] > 0) {
        return { ...prevCounts, [id]: prevCounts[id] - 1 };
      }
      return prevCounts;
    });
  }, []);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredItems(menuItems);
    } else {
      const filtered = menuItems.filter(item => item.category === category);
      setFilteredItems(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <View style={styles.CategoryList}>
        {['All', 'Coffee', 'Non Coffee', 'Eat-ables'].map((category, index) => (
          <CategoryItem
            key={index.toString()}
            name={category}
            onPress={handleCategoryPress}
            isSelected={selectedCategory === category}
          />
        ))}
      </View>
      <ScrollView style={styles.menuContainer}>
        {filteredItems.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            itemCounts={itemCounts}
            incrementCount={incrementCount}
            decrementCount={decrementCount}
          />
        ))}
      </ScrollView>
      <View style={styles.paymentContainer}>
        <TouchableOpacity style={styles.paymentButton} onPress={() => navigation.navigate('Payment', { itemCounts, menuItems })}>
          <Text style={styles.buttonText3}>Choose Payment Method</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
    backgroundColor: "#617463",
    opacity: 0.7,
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 17,
    marginHorizontal: 3,
    height: 30,
  },
  selectedCategoryItem: {
    backgroundColor: "#919D92",
  },
  categoryText: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: '#19301B',
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
    backgroundColor: '#354F37',
    padding: 20,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  menuImage: {
    width: 140,
    height: 140,
    borderRadius: 30,
    marginRight: 10,
  },
  menuDetailsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  menuDetails: {
    alignItems: 'flex-start',
    marginLeft: 30,
  },
  menuText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  addButtonContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
    
  },
  addButton: {
    backgroundColor: '#96A197',
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginLeft: 30,
    marginTop: 10,
  },
  buttonText: {
    color: '#19301B',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonText2: {
    color: '#19301B',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonText3: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
  paymentButton: {
    backgroundColor: '#19301B',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentContainer: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    padding: 20,
    width: 410,
    alignSelf: 'center',
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    marginTop: 790,
  },
});
