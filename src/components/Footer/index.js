import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export default function Footer(){
    return(
        <View style={styles.container}>
            <View style={styles.viewPtCima}>
                <Text style={styles.texto}>PRIVACIDADE</Text>
                <Text style={styles.texto}>TERMOS</Text>
                <Text style={styles.texto}>ACESSIBILIDADE</Text>
            </View>

            <View style={styles.viewPtBaixo}>
                <Text style={styles.texto}>© 2024 UNIFAE CARE. CLINICAL EDITORIAL SYSTEM.</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20
    },
    viewPtCima: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 45,
        paddingVertical: 10
    },
    viewPtBaixo: {
        paddingHorizontal: 40,
        alignItems:'center'
    },
    texto:{
        color: colors.grayLight,
        fontSize: 12
    }
})