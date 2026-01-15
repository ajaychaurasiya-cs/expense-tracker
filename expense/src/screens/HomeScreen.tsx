import React, { } from "react";
import { View,  StyleSheet, } from "react-native";
import ContainerUi from "../ui/ContainerUi";
import TitleUi from "../ui/TitleUi";
import UserHistory from "./components/UserHistory";
import UserDay from "./components/UserDay";


const HomeScreen = ({navigation}:{navigation: any}) => {

 



  return (
    <View style={styles.container}>
      <ContainerUi >
        <TitleUi textAlign='center'>Expense</TitleUi>
       <UserDay />
      </ContainerUi>
      
      <UserHistory navigation={navigation} />
      
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 10, },
    
})