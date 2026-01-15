import { StyleSheet,  View } from "react-native";
import {Colors} from "../colors/theme";
import { ReactNode } from "react";



type wrp = "wrap" | "nowrap" | "wrap-reverse";
type flexdir = 'column' |'row'|'column-reverse'|'row-reverse';
interface Props{
    children: ReactNode,
    wrap?: wrp,
    flexdir?: flexdir,

}

const ContainerUi = ({children, wrap, flexdir}:Props) => {


    const wrapVlaue = 
    wrap === "wrap"
    ? "wrap"
    : wrap === "wrap-reverse"
    ? "wrap-reverse"
    : "nowrap";

    const dirVlaue =
    flexdir === "row"
    ? "row"
    :flexdir === 'row-reverse'
    ? 'row-reverse'
    :flexdir === 'column-reverse'
    ? 'column-reverse'
    : 'column'


    const styles = StyleSheet.create({
        container: { borderRadius: 20, margin: 5, padding: 20, backgroundColor: Colors.container, flexDirection: dirVlaue, flexWrap: wrapVlaue, },
        
    })

    return ( 
    <View style={styles.container}>
        {children}
    </View> 
    );
}
 
export default ContainerUi;

