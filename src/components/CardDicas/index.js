import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const DicaFisioterapeuta = ({ dica }) => (
    <View style={styles.dicaContainer}>
        <View style={styles.dicaHeader}>
            <View style={styles.dicaIcone}>
                <Text style={styles.dicaIconeText}>💡</Text>
            </View>
            <Text style={styles.dicaTitulo}>Dica do Fisioterapeuta</Text>
        </View>
        <View style={styles.dicaCard}>
            <Text style={styles.dicaTexto}>"{dica.texto}"</Text>
            <View style={styles.dicaAutorRow}>
                <View style={styles.dicaAvatar}>
                    <Text style={styles.dicaAvatarText}>
                        {dica.autor.split(' ')[1]?.[0] || 'F'}
                    </Text>
                </View>
                <View>
                    <Text style={styles.dicaAutor}>{dica.autor}</Text>
                    <Text style={styles.dicaEspecialidade}>{dica.especialidade}</Text>
                </View>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    dicaContainer: {
        marginBottom: 8,
    },
    dicaHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    dicaIcone: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dicaIconeText: {
        fontSize: 16,
    },
    dicaTitulo: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.text,
    },
    dicaCard: {
        backgroundColor: colors.tipBg,
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: colors.greenPrimary,
    },
    dicaTexto: {
        fontSize: 14,
        color: colors.text,
        lineHeight: 22,
        fontStyle: 'italic',
        marginBottom: 16,
    },
    dicaAutorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    dicaAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.greenPrimary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dicaAvatarText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: '700',
    },
    dicaAutor: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.text,
    },
    dicaEspecialidade: {
        fontSize: 12,
        color: colors.textSecondary,
    },

})