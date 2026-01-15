import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Colors } from "../../colors/theme";



type Transaction = {
  _id: string;
  amount: number;
  category: string;
  date: string;
  title?: string;
};


const TodayTotalExpense = () => {
  const [todayExpense, setTodayExpense] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
    fetchExpense();
    },[]),
  );
  
  const fetchExpense = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await axios.get(
        "http://10.0.2.2:5000/api/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const transactions: Transaction[] = Array.isArray(res.data)
        ? res.data
        : res.data?.data ?? [];

      let todayTotal = 0;
      let allTotal = 0;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      transactions.forEach((item: Transaction) => {
        const d = new Date(item.date);
        if (isNaN(d.getTime())) return;

        allTotal += item.amount;

        const itemDate = new Date(d);
        itemDate.setHours(0, 0, 0, 0);

        if (itemDate.getTime() === today.getTime()) {
          todayTotal += item.amount;
        }
      });

      setTodayExpense(todayTotal);
      setTotalExpense(allTotal);
    } catch (error) {
      console.log("ERROR 👉", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Text style={{ textAlign: "center" }}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Today Expense</Text>
        <Text style={styles.amount}>₹ {todayExpense}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Total Expense</Text>
        <Text style={styles.amount}>₹ {totalExpense}</Text>
      </View>
    </View>
  );
};

export default TodayTotalExpense;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  card: {
    flex: 1,
    marginHorizontal: 8,
    padding: 16,
    backgroundColor: Colors.card,
    borderRadius: 10,
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: Colors.text,
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
    color: Colors.text,
  },
});
