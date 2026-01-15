import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import CardUi from "../ui/CardUi";
import SubTitleUi from "../ui/SubTitleUi";
import ContainerUi from "../ui/ContainerUi";
import TitleUi from "../ui/TitleUi";
import { Colors } from "../colors/theme";

export default function RegisterScreen({ navigation }: any) {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
        console.log('rgstr',name,email,password);
      await register(name, email, password);
      navigation.navigate("Login");
    } catch (e) {
      console.log("Register Error", e);
    }
  };

  return (
    <View style={styles.cont}>
    

      <ContainerUi>
        <TitleUi textAlign="center">Register</TitleUi>
        <TextInput
          style={styles.inputAria}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.inputAria}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.inputAria}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={handleRegister}>
          <CardUi>
            <SubTitleUi textAlign="center">Register</SubTitleUi>
          </CardUi>
        </TouchableOpacity>
       
      </ContainerUi>
    </View>
  );
}
const styles = StyleSheet.create({
  cont: { padding: 20 },
  inputAria: {
    color: Colors.container,
    fontSize: 20,
    fontWeight: '500',
    backgroundColor: Colors.background,
    borderRadius: 10,
    marginBottom: 20,
    padding: 5,
  },
});
