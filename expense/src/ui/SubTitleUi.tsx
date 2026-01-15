import { StyleSheet, Text, } from "react-native";
import {Colors} from "../colors/theme";


type textAlign = "auto" | "left" | "right" | "center";
interface Props{
    children: React.ReactNode,
    textAlign?: textAlign
}

const SubTitleUi = ({children, textAlign}:Props) => {

    const textAlignValue = 
    textAlign === "left"
    ? "left"
    : textAlign === "right"
    ? "right"
    : textAlign === "center"
    ? "center"
    : "auto";


    const styles = StyleSheet.create({
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: textAlignValue,  color: Colors.text, top:10, },
})
    return ( 
    
        <Text style={styles.title}> {children} </Text>
    );
}
 
export default SubTitleUi;
