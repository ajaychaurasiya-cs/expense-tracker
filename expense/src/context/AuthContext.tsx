import React, {createContext, useContext, useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface AuthContextType {
  userToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [userToken, setUserToken] = useState<string | null>(null); console.log(userToken);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) setUserToken(token);
    };
    loadToken();
  }, []);


  const login = async (email: string, password: string) => {
    const res = await axios.post(`http://10.0.2.2:5000/api/auth/login`, {email, password});
    // const res = await axios.post("http://192.168.43.127:5000/api/auth/login", {email, password});
    await AsyncStorage.setItem("token", res.data.token);
    setUserToken(res.data.token); 
  };

  const register = async (name: string, email: string, password: string) => {
    console.log(name,email,password);
    await axios.post("http://10.0.2.2:5000/api/auth/register", {name, email, password}); // use to android amulator
    // await axios.post(`http://192.168.43.127:5000/api/auth/register`, {name, email, password});
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{userToken, login, register, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
