import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export default function MetaSemanal({ progresso = 85 }) {
    return (
        <View style={styles.card}>
            <Text style={styles.titulo}>META SEMANAL</Text>

            <View style={styles.linha}>
                <Text style={styles.percentual}>{progresso}%</Text>
                <Text style={styles.status}>Concluído</Text>
            </View>

            <View style={styles.barraBg}>
                <View style={[styles.barraProgresso, { width: `${progresso}%` }]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor:'#eeeeee',
        borderRadius: 20,
        padding: 20,
        margin: 5,
    },
    titulo: {
        color:  colors.greenPrimary,
        fontWeight: "bold",
        letterSpacing: 1,
        marginBottom: 10,
    },
    linha: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 15,
    },
    percentual: {
        fontSize: 30,
        fontWeight: "bold",
        color: colors.greenPrimary,
    },
    status: {
        fontSize: 16,
        color: "#4E6E4E",
    },
    barraBg: {
        width: "100%",
        height: 10,
        backgroundColor: "#E5E5E5",
        borderRadius: 10,
        overflow: "hidden",
    },
    barraProgresso: {
        height: "100%",
        backgroundColor:  colors.greenPrimary,
        borderRadius: 10,
    },
});