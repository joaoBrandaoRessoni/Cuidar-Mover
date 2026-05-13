import { StyleSheet, View, Text } from "react-native";
import { colors } from "../../theme/colors";

export const PassoItem = ({ passo }) => (
    <View style={styles.passoContainer}>
        <View style={styles.passoHeader}>
            <View style={styles.passoNumero}>
                <Text style={styles.passoNumeroText}>{passo.numero}</Text>
            </View>
            <Text style={styles.passoTitulo}>{passo.titulo}</Text>
        </View>
        <View style={styles.passoLinhaContainer}>
            <View style={styles.passoLinha} />
            <Text style={styles.passoDescricao}>{passo.descricao}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
 

    passoContainer: {
        marginBottom: 16,
    },
    passoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 8,
    },
    passoNumero: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    passoNumeroText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: '800',
    },
    passoTitulo: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.text,
        flex: 1,
    },
    passoLinhaContainer: {
        flexDirection: 'row',
        gap: 12,
        paddingLeft: 16,
    },
    passoLinha: {
        width: 2,
        backgroundColor: colors.primaryLight,
        borderRadius: 1,
        marginLeft: 0,
    },
    passoDescricao: {
        flex: 1,
        fontSize: 14,
        color: colors.textSecondary,
        lineHeight: 22,
        paddingVertical: 4,
        paddingLeft: 12,
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 14,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
})