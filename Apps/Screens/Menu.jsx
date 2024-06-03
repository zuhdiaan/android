import React, { useState, useEffect, useCallback, memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import debounce from 'lodash.debounce';
import Magnifier from "./../../assets/images/magnifier.png";

const menuItems = [];

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
        style={[styles.title, { width: '100%' }]}
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

const MenuItem = memo(({ item, itemCounts, incrementCount, decrementCount, index, totalItems }) => {
  const quantity = itemCounts[item.id] || 0;

  return (
    <View style={[styles.menuItem, index === totalItems - 1 && styles.lastMenuItem]}>
     <Image source={{  uri: 'http://10.0.2.2:3000/uploads/' + item.image_source }} style={styles.menuImage} />
      <View style={styles.menuDetailsContainer}>
        <View style={styles.menuDetails}>
          <Text style={styles.menuText}>{item.name}</Text>
          <Text style={styles.priceText}>Rp. {item.price}</Text>
        </View>
        <View style={styles.addButtonContainer}>
          {quantity === 0 ? (
            <TouchableOpacity style={styles.addButton} onPress={() => incrementCount(item.id)}>
              <Text style={styles.buttonText2}>+ Add</Text>
            </TouchableOpacity>
          ) : (
        <View style={styles.addButtonContainer2}>
          <TouchableOpacity style={styles.addButton2} onPress={() => decrementCount(item.id)}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.buttonText}>{quantity}</Text>
          <TouchableOpacity style={styles.addButton2} onPress={() => incrementCount(item.id)}>
            <Text style={styles.buttonText}>+</Text>
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
    fetch('http://10.0.2.2:3000/api/menu_items')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        menuItems.length = 0; // Clear the array
        menuItems.push(...data); // Populate the array with the fetched data
        setFilteredItems([...data]); // Update filteredItems with the new data
        setItemCounts(data.reduce((acc, item) => {
          acc[item.id] = 0;
          return acc;
        }, {}));
      })
      .catch(error => console.error('Error fetching menu items:', error.message));
  }, []);  

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
      {filteredItems.length === 0 ? (
  <Text style={styles.noItems}>No items found</Text>
) : (
  filteredItems.map((item, index) => (
    <MenuItem
      key={item.id}
      item={item}
      itemCounts={itemCounts}
      incrementCount={incrementCount}
      decrementCount={decrementCount}
      index={index}
      totalItems={filteredItems.length}
    />
  ))
)}
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
    marginLeft: 30,  
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
  lastMenuItem: {
    marginBottom: 90,
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
  },
  addButtonContainer2: {
    backgroundColor: '#96A197',
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    marginLeft: 30,
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
    addButton2: {
    backgroundColor: '#96A197',
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
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
  noItems: {
    fontSize: 20,
    fontWeight: '200',
    color: '#FFFFFF',
    textAlign: "center",
    marginTop: 250,
  },
});
