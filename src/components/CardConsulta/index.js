import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";

export default function CardConsulta({ title, text, local, icon, color, onDesmarcar }) {
    return (
        <View style={styles.card}>
            <View>
                <View style={{ paddingVertical: 5, paddingHorizontal: 0, flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <Text style={styles.titulo}>{title}</Text>
                </View>
                <Text style={styles.texto}>{text}</Text>
                <Text style={styles.texto}>{local}</Text>
            </View>

            <View >
                <TouchableOpacity style={styles.btn} onPress={onDesmarcar}>
                    <Text style={styles.txtBtn}>Desmarcar</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.light,
        borderTopEndRadius: 8,
        borderEndEndRadius: 8,
        padding: 15,
        borderStartWidth: 5,
        borderColor: colors.greenPrimary,
        maxWidth: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',

        elevation: 5, // Sombra no Android
        shadowColor: '#000000ca', // Cor da sombra no iOS
        shadowOffset: { width: 1, height: 1 }, // Deslocamento da sombra no iOS
        shadowOpacity: 0.3, // Opacidade da sombra no iOS
        shadowRadius: 3,
    },
    titulo: {
        color: colors.greenPrimary,
        fontSize: 17,
    },
    texto: {
        color: colors.text,
        fontSize: 16,

    },
    btn: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.greenPrimary,
        paddingHorizontal: 12,
        paddingVertical: 10
    },
    txtBtn: {
        color: colors.greenPrimary,
        fontSize: 16,
    },
})