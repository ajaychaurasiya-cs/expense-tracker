import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { CategoryProvider } from "./src/context/CategoryContext";
import { HistoryProvider } from "./src/context/UpdateHistory";
import AuthNavigator from "./src/navigation/AuthNavigator";
import TabNavigator from "./src/navigation/tab-navigation";

const RootNavigator = () => {
  const { userToken } = useAuth();
  return userToken ? <TabNavigator /> : <AuthNavigator />;
};

export default function App() {
  return (
    <AuthProvider>
      <CategoryProvider>
        <HistoryProvider>
        <NavigationContainer>
          <RootNavigator/>
        </NavigationContainer>
        </HistoryProvider>
      </CategoryProvider>
    </AuthProvider>
  );
}
