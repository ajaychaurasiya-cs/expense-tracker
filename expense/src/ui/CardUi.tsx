import { StyleSheet,  View } from "react-native";
import { Colors } from "../colors/theme";




type CardAlign = "auto" | "left" | "right" | "center";


interface Props{
    children: React.ReactNode,
    cardAlign?: CardAlign
} 


const CardUi = ({ children, cardAlign }: Props) => {

   
    const alignSelfValue = 
    cardAlign === "left"
    ? "flex-start"
    : cardAlign === "right"
    ? "flex-end"
    : cardAlign === "center"
    ? "center"
    : "auto";

  


    const styles = StyleSheet.create({
    container: { borderRadius: 20, justifyContent: 'center', margin: 5, padding: 5, backgroundColor: Colors.card, alignSelf: alignSelfValue,   },
   
})
    return ( 
    <View style={styles.container}>
        {children}
    </View> 
    );
}
 
export default CardUi;

