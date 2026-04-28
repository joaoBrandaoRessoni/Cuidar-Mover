import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export default function Footer() {
    return (
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
        bottom: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    viewPtCima: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20
    },
    viewPtBaixo: {
        alignItems: 'center'
    },
    texto: {
        color: colors.grayLight,
        fontSize: 12
    }
})