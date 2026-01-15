import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity,} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/AuthContext";
import ContainerUi from "../../ui/ContainerUi";
import TitleUi from "../../ui/TitleUi";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "../../colors/theme";
import CardUi from "../../ui/CardUi";
import SubTitleUi from "../../ui/SubTitleUi";


interface User {
  _id: string;
  name: string;
  email: string;
}



export default function DashboardScreen() {
  const [userData, setUserData] = useState<User | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("token");
    
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
  }, []);

  return (
    <View >
      <CardUi>
      <ContainerUi flexdir="row" >
       
        <Ionicons name="person" size={100} color={Colors.icon} />
        <FlatList
          data={userData ? [userData] : []}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginTop: 20 }}> 
              <TitleUi>{item.name}</TitleUi>
              <Text style={{ fontSize: 16, color: "gray", }}>
                {item.email}
              </Text>
            </View>
          )}
        />
        
      </ContainerUi>
      <TouchableOpacity onPress={logout}>
        <SubTitleUi textAlign="center" children="Logout"  />
      </TouchableOpacity>
      
      </CardUi>


     
    </View>
  );
}
