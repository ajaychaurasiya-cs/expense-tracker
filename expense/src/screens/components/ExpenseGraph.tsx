import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet,  } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Colors } from "../../colors/theme";
import SubTitleUi from "../../ui/SubTitleUi";


/* 👆 helper upar hi rahe */
const getWeeklyExpense = (data: any[]) => {
  const week = [0, 0, 0, 0, 0, 0, 0]; // Sun → Sat

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  data.forEach(item => {
    if (item?.amount && item?.date) {
      const d = new Date(item.date);
      if (isNaN(d.getTime())) return;

      if (d >= startOfWeek && d <= endOfWeek) {
        const dayIndex = d.getDay(); // 0–6
        week[dayIndex] += Number(item.amount);
      }
    }
  });

  return week;
};



const ExpenseChart = () => {
  const [weekly, setWeekly] = useState<number[]>([0,0,0,0,0,0,0]);
  const [loading, setLoading] = useState(true);

useFocusEffect(
    useCallback(() => {
      fetchWeekly();
    }, []),
  );

const fetchWeekly = async () => {
  try {
    const token = await AsyncStorage.getItem("token"); // ✅ await

    const res = await axios.get(
      "http://10.0.2.2:5000/api/transactions",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const transactions = Array.isArray(res.data)
      ? res.data
      : res.data?.data ?? [];

    const result = getWeeklyExpense(transactions);
    setWeekly(result);
  } catch (error) {
    console.log("AXIOS ERROR 👉", error);
  } finally {
    setLoading(false);
  }
};

  const maxValue = Math.max(...weekly, 1);

  if (loading) {
    return <Text style={{ textAlign: "center" }}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <SubTitleUi textAlign="center" >Weekly Expense</SubTitleUi>

      <View style={styles.chart}>
        {weekly.map((value, index) => {
          const height = (value / maxValue) * 150;

          return (
            <View key={index} style={styles.barContainer}>
              <Text style={styles.amount}>₹{value}</Text>
              <View style={[styles.bar, { height }]} />
              <Text style={styles.label}>
                {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][index]}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ExpenseChart;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 10,
    borderRadius: 20,
    backgroundColor: Colors.container,

  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  chart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 200,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    borderColor: Colors.card,
  },
  barContainer: {
    alignItems: "center",
    flex: 1,
  },
  bar: {
    width: 20,
    backgroundColor: "#ff5252",
    borderRadius: 4,
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    color: Colors.text,
  },
  amount: {
    fontSize: 10,
    marginBottom: 4,
    color: Colors.text,
  },
});