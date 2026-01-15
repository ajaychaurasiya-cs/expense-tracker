import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import SubTitleUi from "../../ui/SubTitleUi";
import CardUi from "../../ui/CardUi";
import { Colors } from "../../colors/theme";

interface Transaction {
  _id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

function UserHistory({ navigation }: { navigation: any }) {
  const [historyData, setHistoryData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

   

  // 🔹 Date format helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      // year: "numeric",
    });
  };

  // 🔹 Fetch transactions (REAL-TIME on screen focus)
  const fetchHistory = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      const res = await axios.get(
        "http://10.0.2.2:5000/api/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistoryData(res.data);
    } catch (error) {
      console.log("Fetch Transaction Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Runs every time screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  // 🔹 Loader
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color={Colors.text} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* <ContainerUi> */}
        <SubTitleUi textAlign="center">
          <Text style={{ color: Colors.container }}>History</Text>
        </SubTitleUi>
      {/* </ContainerUi> */}
        {/* 🔹 Empty State */}
        {historyData.length === 0 && !loading && (
          <Text
            style={{
              textAlign: "center",
              marginTop: 40,
              color: Colors.text,
            }}
          >
            No transactions found
          </Text>
        )}

        {/* 🔥 BEST PRACTICE LIST */}
        <FlatList
          data={historyData.slice(0, 5)}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("User")}
              activeOpacity={0.7}
            >
              <CardUi>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <SubTitleUi>{item.title}</SubTitleUi>
                  <SubTitleUi>₹ {item.amount}</SubTitleUi>
                </View>

                <Text
                  style={{
                    alignSelf: "flex-end",
                    color: Colors.text,
                    fontSize: 12,
                    marginTop: 4,
                    marginRight: 5,
                  }}
                >
                  {formatDate(item.date)}
                </Text>
              </CardUi>
            </TouchableOpacity>
          )}
        />
      {/* </ContainerUi> */}
    </View>
  );
}

export default UserHistory;
