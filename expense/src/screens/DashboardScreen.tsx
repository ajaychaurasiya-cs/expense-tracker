import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/AuthContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

interface User {
  _id: string;
  name: string;
  email: string;
}

type Props = NativeStackScreenProps<any>;

export default function DashboardScreen({ navigation }: Props) {
  const [userData, setUserData] = useState<User | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        return navigation.navigate("Login");
      }

      try {
        const res = await axios.get("http://10.0.2.2:5000/api/auth/getuser", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Log full API response
        console.log("API Response:", res.data);

        // Adjust this based on your backend response
        const user = res.data.user ?? res.data;

        if (user && user._id) {
          setUserData(user);
        } else {
          console.warn("Invalid user data received:", user);
        }
      } catch (error) {
        console.log("Fetch User Error:", error);
      }
    };

    loadToken();
  }, [navigation]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Welcome to Dashboard 🎉
      </Text>

      <Button title="Logout" onPress={logout} />

      <FlatList
        data={userData ? [userData] : []}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 18 }}>Name: {item.name}</Text>
            <Text style={{ fontSize: 16, color: "gray" }}>
              Email: {item.email}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
