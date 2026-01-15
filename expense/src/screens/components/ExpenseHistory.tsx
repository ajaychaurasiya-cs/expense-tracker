import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SubTitleUi from '../../ui/SubTitleUi';
import { Colors } from '../../colors/theme';
import UpdateHistory from '../../popMenu/UpdateHistory';
import { useHistory } from '../../context/UpdateHistory';
import CardUi from '../../ui/CardUi';

interface Transaction {
  _id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

function UserHistory() {
  const [historyData, setHistoryData] = useState<Transaction[]>([]);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [dropMenu, setDropMenu] = useState<boolean>(false);

  const [title, setTitle] = useState<string | null>(null);
  const [amount, setAmount] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  const {editHistory,setEditHistory, editEnable, useItemId, setUseItemId, deleteId, okEdit} = useHistory();


  // auto set values in edit inputs
  useEffect(() => {
    if (editEnable && useItemId) {
      const item = historyData.find(item => item._id === useItemId);
      if (item) {
        setTitle(item.title);
        setAmount(item.amount.toString());
        setCategory(item.category);
      }
    }
  }, [editEnable, useItemId, historyData]);

  // moove to context data
  useEffect(() => {
    setEditHistory({title:title, category:category, amount:amount})
    console.log(editHistory);
  }, [title, amount, category, ]);

  // 🔹 Date format helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // 🔹 Fetch transactions (REAL-TIME on screen focus)
  const fetchHistory = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');

      const res = await axios.get('http://10.0.2.2:5000/api/transactions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHistoryData(res.data);
    } catch (error) {
      console.log('Fetch Transaction Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Runs every time screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [deleteId, okEdit&&editHistory]),
  );

  // 🔹 Loader
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={Colors.text} />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.container,
        borderRadius: 20,
        margin: 10,
        padding: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SubTitleUi textAlign="center">History</SubTitleUi>
        {dropMenu ? (
          <MaterialIcons
            onPress={() => setDropMenu(false)}
            name="arrow-drop-up"
            size={50}
            color={Colors.text}
          />
        ) : (
          <MaterialIcons
            onPress={() => setDropMenu(true)}
            name="arrow-drop-down"
            size={50}
            color={Colors.text}
          />
        )}
      </View>
      {/* 🔹 Empty State */}
      {historyData.length === 0 && !loading && (
        <Text
          style={{
            textAlign: 'center',
            marginTop: 40,
            color: Colors.text,
          }}
        >
          No transactions found
        </Text>
      )}

      {/* 🔥 BEST PRACTICE LIST */}
      <FlatList
        style={{ flex: 1, padding: 5, borderRadius: 10 }}
        data={historyData.slice(0, dropMenu ? historyData.length : 4)}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setUseItemId(item._id)}
            activeOpacity={0.7}
          >
            <View>          
            
              {item._id == useItemId ? <UpdateHistory /> : null}

              {item._id == useItemId && editEnable ? (
                <View
                  style={{ flexDirection: 'row',
                    justifyContent: 'space-around',
                    // backgroundColor: Colors.card,
                  }}
                >
                <TextInput
                  style={styles.inputText}
                  value={title??""}
                  onChangeText={(text) => setTitle(text)}
                />
                
                <TextInput
                  style={styles.inputText}
                  value={category??""}
                  onChangeText={(text) => setCategory(text)}
                /><Text style={styles.rupee}>₹</Text>
                <TextInput
                  style={styles.inputText}
                  value={amount??""}
                  onChangeText={(text) => setAmount(text)}
                />
                </View>
              ) :""}
              {item._id == useItemId? "": (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}
                >
                  <CardUi>
                  <Ionicons
                    name="ellipsis-vertical"
                    size={25}
                    color={Colors.text}
                  />
                  </CardUi>
                  <SubTitleUi>{item.title}</SubTitleUi>
                  <SubTitleUi>{item.category}</SubTitleUi>
                  <SubTitleUi>₹ {item.amount}</SubTitleUi>
                </View>
              )}
            </View>

            <Text
              style={{
                alignSelf: 'flex-end',
                color: Colors.text,
                fontSize: 12,
                // marginTop: 4,
              }}
            >
              {formatDate(item.date)}
            </Text>
            <View
              style={{ backgroundColor: Colors.card, height: 1, margin: 5 }}
            />
            <View></View>
          </TouchableOpacity>
        )}
      />

      {/* {popUp?<UpdateHistory/>:null} */}
    </View>
  );
}

export default UserHistory;

const styles = StyleSheet.create({
  inputText: { fontSize: 20, fontWeight: 'bold', marginBottom: 20,   color: Colors.container, backgroundColor: Colors.background, borderRadius:10, padding:15  },
  rupee: { fontSize: 20, fontWeight: 'bold', marginBottom: 20,   color: Colors.text,  borderRadius:10, padding:5  },
});