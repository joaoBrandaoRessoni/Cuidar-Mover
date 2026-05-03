import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { colors } from "../../theme/colors";

const { height, width } = Dimensions.get('window');

const getMensagemProgresso = (progresso) => {
    if (progresso < 50) {
        return {
            titulo: "Você precisa se exercitar",
            mensagem: "Tente realizar mais atividades 💪",
            cor: "#DC2626"
        };
    }

    if (progresso < 80) {
        return {
            titulo: "Você está indo bem!",
            mensagem: "Continue assim 💚",
            cor: "#F59E0B"
        };
    }

    return {
        titulo: "Parabéns pelo resultado!",
        mensagem: "Ótimo desempenho essa semana 🎉",
        cor: colors.greenPrimary
    };
};

export default function MetaCardDiario({ progresso = 60 }) {
    const info = getMensagemProgresso(progresso);

    return (
        <View style={styles.card}>
            <Text style={styles.titulo}>SEU PROGRESSO</Text>

            <View style={{ flexDirection: 'row' }}>

                <View style={styles.circuloContainer}>
                    <AnimatedCircularProgress
                        size={120}
                        width={12}
                        fill={progresso}
                        tintColor={info.cor}
                        backgroundColor="#E5E5E5"
                        rotation={0}
                        lineCap="round"
                    >
                        {() => (
                            <Text style={styles.percentual}>
                                {progresso}%
                            </Text>
                        )}
                    </AnimatedCircularProgress>
                </View>
                <View style={{ paddingHorizontal: 25, width: '70%' }}>
                    <Text style={[styles.tituloMens, { color: info.cor }]}>
                        {info.titulo}
                    </Text>
                    <Text style={styles.status}>
                        {info.mensagem}
                    </Text>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.light,
        borderRadius: 20,
        padding: 20,
        margin: 5,
        width: width * 0.94,
        elevation: 5, // Sombra no Android
        shadowColor: '#000000ca', // Cor da sombra no iOS
        shadowOffset: { width: 1, height: 1 }, // Deslocamento da sombra no iOS
        shadowOpacity: 0.3, // Opacidade da sombra no iOS
        shadowRadius: 3,

    },
    titulo: {
        color: colors.greenPrimary,
        fontWeight: "bold",
        letterSpacing: 1,
        marginBottom: 15,
    },
    tituloMens: {
        color: colors.greenPrimary,
        fontWeight: "bold",

        marginBottom: 15,
        fontSize: 16
    },
    circuloContainer: {
        gap: 10,
    },
    percentual: {
        fontSize: 26,
        fontWeight: "bold",
        color: colors.greenPrimary,
    },
    status: {
        fontSize: 16,
        color: "#4E6E4E",
    },
});