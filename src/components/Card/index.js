import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { Ionicons } from '@expo/vector-icons';

export default function Card({ title, text, icon, color}) {
    return (
        <View style={styles.card}>
            <View style={{ paddingVertical: 5, paddingHorizontal: 0, flexDirection: 'row', gap: 10}}>
                 <Ionicons name={icon} size={22} color={color} />
                <Text style={styles.titulo}>{title}</Text>
            </View>
            <Text style={styles.texto}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.fundo,
        borderTopEndRadius: 8,
        borderEndEndRadius: 8,
        padding: 15,
        borderStartWidth: 5,
        borderColor: colors.greenPrimary,
        maxWidth: '100%',
    },
    titulo: {
        color: colors.greenPrimary,
        fontSize: 16,

    },
    texto: {
        color: colors.grayLight,
        fontSize: 14
    }
})