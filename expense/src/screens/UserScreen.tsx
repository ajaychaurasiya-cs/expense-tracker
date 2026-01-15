import React from "react";
import { View, FlatList,  } from "react-native";
import UserProfile from "./components/UserProfile";
import UserDay from "./components/UserDay";
import ExpenseHistory from "./components/ExpenseHistory";
import { Colors } from "../colors/theme";
import ExpenseGraph from "./components/ExpenseGraph";


export default function DashboardScreen() {
  return (

    <FlatList
      data={[{ id: "dashboard" }]}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: Colors.background }}
      renderItem={() => (
        <View>
          <UserProfile />
          <UserDay />
          <ExpenseGraph />
          <ExpenseHistory />
        </View>
      )}
    />
  );
}
