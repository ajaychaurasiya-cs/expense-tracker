import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import AddExpenseScreen from "../screens/AddExpenseScreen";
import UserScreen from "../screens/UserScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "../colors/theme";
const Tab = createBottomTabNavigator();


export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: Colors.container },
        headerTitleStyle:{color:Colors.text},
        headerShown: true,
        headerStatusBarHeight: 20,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.card,
        tabBarInactiveTintColor: Colors.icon,
        tabBarStyle:{backgroundColor:Colors.container},
        sceneStyle:{backgroundColor: Colors.background},

        tabBarIcon: ({ color, size }) => {
          let iconName: string = "";

          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "AddExpense") {
            iconName = "add-circle-outline";
          } else if (route.name === "User") {
            iconName = "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="AddExpense" component={AddExpenseScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
}
