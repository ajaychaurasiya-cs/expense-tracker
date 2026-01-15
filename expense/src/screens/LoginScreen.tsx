import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ContainerUi from '../ui/ContainerUi';
import CardUi from '../ui/CardUi';
import TitleUi from '../ui/TitleUi';
import SubTitleUi from '../ui/SubTitleUi';
import { Colors } from '../colors/theme';

type Props = NativeStackScreenProps<any>;

export default function LoginScreen({ navigation }: Props) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (e) {
      console.log('Login Error', e);
    }
  };

  return (
    <View style={styles.cont}>
      <ContainerUi>
        <TitleUi textAlign="center">Login</TitleUi>
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
        <TouchableOpacity onPress={handleLogin}>
          <CardUi>
            <SubTitleUi textAlign="center">Login</SubTitleUi>
          </CardUi>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <CardUi>
            <SubTitleUi textAlign="center">Go to Register</SubTitleUi>
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
