import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import ContainerUi from '../ui/ContainerUi';
import CardUi from '../ui/CardUi';
import { Colors } from '../colors/theme';
import SubTitleUi from '../ui/SubTitleUi';
import Category from '../popMenu/Category';
import { useCategory } from '../context/CategoryContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlusInputScreen = () => {
  const [itemName, setItemName] = useState<string | null>(null);
  const [itemPrice, setItemPrice] = useState<string | null>(null);

  const { dropDownMenu, setDropDownMenu, chooseMenu, setChooseMenu } =
    useCategory();

  const formData = { title: itemName, amount: itemPrice, category: chooseMenu };

  // ${userId}
  const putData = async () => {
    const token = await AsyncStorage.getItem('token');
    if (itemPrice) {
      try {
        await axios.post(`http://10.0.2.2:5000/api/transactions/`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setItemName('');
        setItemPrice('');
        setChooseMenu('');
      } catch (error) {
        console.log('Fetch User Error:', error);
      }
    } else {
      setItemPrice('please enter Price');
    }
  };

  return (
    <View style={styles.inputView}>
      <CardUi>
        <SubTitleUi children="item name" />
        <ContainerUi>
          <TextInput
            value={itemName ?? ''}
            onChangeText={text => setItemName(text)}
            placeholder="Example: Apple"
            placeholderTextColor={Colors.card}
            style={styles.input}
          />
        </ContainerUi>
      </CardUi>

      <CardUi>
        <SubTitleUi children="Item Price" />
        <ContainerUi>
          <TextInput
            value={itemPrice ?? ''}
            onChangeText={text => setItemPrice(text)}
            placeholder="Example: ₹ 100"
            placeholderTextColor={Colors.card}
            style={styles.input}
          />
        </ContainerUi>
      </CardUi>

      <CardUi>
        <TouchableOpacity onPress={() => setDropDownMenu(true)}>
          <View style={styles.selectBtn}>
            <SubTitleUi children="Select Category" />
            <Ionicons name="apps" size={20} color={Colors.icon} />
          </View>
        </TouchableOpacity>

        <View style={styles.dropDown}>{dropDownMenu && <Category />}</View>
        <ContainerUi>
          <TextInput
            value={chooseMenu ?? ''}
            onChangeText={text => setChooseMenu(text)}
            placeholder="Example: grocery"
            placeholderTextColor={Colors.card}
            style={styles.input}
          />
        </ContainerUi>
      </CardUi>

      <ContainerUi>
        <TouchableOpacity onPress={putData}>
          <CardUi>
            <Text style={styles.addBtn}>Add Expense</Text>
          </CardUi>
        </TouchableOpacity>
      </ContainerUi>
    </View>
  );
};

export default PlusInputScreen;
const styles = StyleSheet.create({
  inputView: {
    padding: 10,
    backgroundColor: Colors.background,
    justifyContent: 'space-around',
    flex: 1,
  },

  input: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: '500',
    textAlignVertical: 'center',
  },

  dropDown: { flexDirection: 'row', alignSelf:"center", position: 'absolute', zIndex: 1, top: 5 },

  selectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },

  addBtn: {
    alignSelf: 'center',
    color: Colors.text,
    fontSize: 30,
    fontWeight: '500',
    padding: 10,
  },
});
