import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../../theme/colors";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";

const STATUS_CONFIG = {
    concluido: {
        label: "CONCLUÍDO",
        color: "#16A34A",
        bg: "#DCFCE7",
        icon: "checkmark-circle",
    },
    pendente: {
        label: "PENDENTE",
        color: "#64748B",
        bg: "#E2E8F0",
        icon: "play",
    },
    bloqueado: {
        label: "BLOQUEADO",
        color: "#94A3B8",
        bg: "#E5E7EB",
        icon: "lock-closed",
    }
};

export default function CardExercicio({ title, text, status, foto }) {

    const config = STATUS_CONFIG[status];

    console.log('config', config)

    return (
        <View style={styles.card}>
            <View style={styles.left}>

                <Image source={foto} />
                <View style={styles.exercicios}>

                    <Text style={styles.titulo}>{title}</Text>
                    <Text style={styles.texto}>{text}</Text>
                </View>
            </View>

            <View style={styles.right}>
                <View style={[styles.badge, { backgroundColor: config.bg }]}>
                    <Text style={[styles.badgeText, { color: config.color }]}>{config.label}</Text>
                </View>

                <TouchableOpacity
                    disabled={status === "bloqueado"}
                    style={[
                        styles.iconBtn,
                        status === "pendente" && { backgroundColor: colors.transparent },
                        status === "bloqueado" && { backgroundColor: "#E5E7EB" },
                        status === "concluido" && { backgroundColor: "#DCFCE7" }
                    ]}
                >
                    <Ionicons name={config.icon} size={25}
                        color={status === "pendente"
                            ? colors.greenPrimary
                            : status === "concluido"
                                ? "#16A34A"
                                : config.color} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.light,
        borderRadius: 8,
        padding: 15,
        width: '100%',
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
        fontSize: 18,
        fontWeight: 'bold'
    },
    texto: {
        color: colors.text,
        fontSize: 16,

    },
    textoStatus: {
        color: colors.greenPrimary,
        fontSize: 16,

    },
    left: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        width: '70%'
    },
    exercicios: {
        width: '60%',
        paddingVertical: 5,
        paddingHorizontal: 0,
        flexDirection: 'column',
        gap: 5,
      

    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 0,
        width: '35%',
      
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
       
    },
    badgeText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    iconBtn: {
        // width: 40,
        // height: 40,
        padding: 5,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        
    }
})