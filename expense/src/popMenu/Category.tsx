import React, { useCallback, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import SubTitleUi from '../ui/SubTitleUi';
import { Colors } from '../colors/theme';
import { useCategory } from '../context/CategoryContext';

/* ---------------- TYPES ---------------- */

interface Transaction {
  _id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

/* ---------------- COMPONENT ---------------- */

const Category: React.FC = () => {
  const [historyData, setHistoryData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { setChooseMenu, setDropDownMenu } = useCategory();

  /* ---------------- API CALL ---------------- */

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');

      const res = await axios.get<Transaction[]>(
        'http://10.0.2.2:5000/api/transactions',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistoryData(res.data);
    } catch (error) {
      console.log('Fetch Transaction Error:', error);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- SCREEN FOCUS ---------------- */

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  /* ---------------- UNIQUE CATEGORY LOGIC ---------------- */

  const uniqueCategories: Transaction[] = Array.from(
    new Map(
      historyData.map(item => [item.category, item])
    ).values()
  );

  /* ---------------- HANDLER ---------------- */

  const handleChoose = (category: string) => {
    setChooseMenu(category);
    setDropDownMenu(false);
  };

  /* ---------------- UI ---------------- */

  return (
    <View style={styles.card}>
      {/* <CardUi> */}
        {loading ? (
          <ActivityIndicator size="large" color={Colors.container} />
        ) : (
         <FlatList
  data={uniqueCategories}
  horizontal
  keyExtractor={item => item.category}
  showsHorizontalScrollIndicator={false}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleChoose(item.category)}
    >
      <SubTitleUi>{item.category}</SubTitleUi>
    </TouchableOpacity>
  )}
/>

        )}
      {/* </CardUi> */}
    </View>
  );
};

export default Category;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  card:{backgroundColor:Colors.background, padding:5, borderRadius:10},
  item: {
    marginRight: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Colors.container,
  },
});

