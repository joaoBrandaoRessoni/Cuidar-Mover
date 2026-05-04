import { useState, useEffect} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

export default function HeaderHome() {
    const [profile, setProfile] = useState({ name: "", email: "", percentCompleted: 0 })
    const isFocused = useIsFocused();

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await axios.get(
                    `${process.env.EXPO_PUBLIC_API_URL}/app/home/profile`
                );

                setProfile({
                    name: response.data.profile.name,
                    email: response.data.profile.email,
                    percentCompleted: response.data.weeklyProgress.percentCompleted
                })

            } catch (error) {
                console.log("Erro ao buscar perfil:", error);
                console.log("Mensagem:", error.message);

                if (error.response) {
                    console.log("Status:", error.response.status);
                    console.log("Resposta backend:", error.response.data);
                } else if (error.request) {
                    console.log("Sem resposta do servidor.");
                } else {
                    console.log("Erro inesperado.");
                }
            }
        };

        getProfile();
    }, [isFocused]);

    return (
        <View style={styles.container}>

            <View style={styles.left}>
                <Image
                    source={require('../../../assets/imagens/fotoPerfil.png')}
                    style={styles.avatar}
                />

                <View>
                    <Text style={styles.subtitulo}>
                        Bem-vindo de volta,
                    </Text>
                    <Text style={styles.titulo}>
                        Olá, {profile.name}
                    </Text>
                </View>
            </View>

            <TouchableOpacity>
                <Ionicons name="notifications-outline" size={24} color={colors.greenPrimary} />
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        marginTop: 30,
    },
    left: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: colors.greenPrimary,
    },
    subtitulo: {
        fontSize: 12,
        color: "#6B7280",
    },
    titulo: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111",
    },
});