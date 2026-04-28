import { memo, useEffect, useState } from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { colors } from "../theme/colors";
import Button from "../components/Button";
import MetaSemanal from "../components/MetaModal";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

export const Perfil = ({ navigation }) => {
    const [profile, setProfile] = useState({name: "", email: "", percentCompleted: 0})
    const isFocused = useIsFocused();

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await axios.get(
                    `${process.env.EXPO_PUBLIC_API_URL}/api/v1/app/home/profile`
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

    const logout = async () => {
        await AsyncStorage.removeItem("access_token")

        navigation.navigate("Login")
    }

    const config = [
        { id: 1, iconName: 'alarm-outline', title: 'Lembretes', iconeDireita: 'chevron-forward' },
        { id: 2, iconName: 'notifications-outline', title: 'Notificações', iconeDireita: 'chevron-forward' },
        { id: 3, iconName: 'shield-checkmark-outline', title: 'Privacidade e Dados', iconeDireita: 'chevron-forward' },
    ];

    const ItemTabela = memo(({ iconName, title, iconeDireita }) => (
        <TouchableOpacity style={styles.item}>
            <View style={styles.left}>
                <Ionicons name={iconName} size={22} color={colors.greenPrimary} />
                <Text style={styles.itemText}>{title}</Text>
            </View>

            <Ionicons name={iconeDireita} size={20} color="#999" />
        </TouchableOpacity>
    ));

    return (
        <ScrollView>
            <View style={styles.container}>

                {/* PERFIL */}
                <View style={styles.profileContainer}>
                    <View style={styles.imageWrapper}>
                        <Image
                            source={require('../../assets/imagens/fotoPerfil.png')}
                            style={styles.image}
                        />
                        <TouchableOpacity style={styles.editButton}>
                            <Ionicons name="pencil" size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.name}>{profile.name}</Text>

                </View>


                <View style={styles.cards}>
                    <View style={styles.card}>
                        <Ionicons name="checkmark-circle-outline" size={24} color={colors.greenPrimary} />
                        <Text style={styles.cardText}>24 sessões realizadas</Text>
                    </View>

                    <View style={styles.card}>
                        <Ionicons name="calendar-outline" size={24} color={colors.greenPrimary} />
                        <Text style={styles.cardText}>Próxima sessão</Text>
                    </View>
                    <View style={styles.card}>
                        <Ionicons name="body-outline" size={24} color={colors.greenPrimary} />
                        <Text style={styles.cardText}>Especialistas Ortopédicos</Text>
                    </View>
                </View>

                <MetaSemanal progresso={profile.percentCompleted} />

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Configurações e Suporte</Text>

                    <View style={styles.list}>
                        {config.map((item) => (
                            <ItemTabela key={item.id} {...item} />
                        ))}
                    </View>
                </View>

                <Text style={styles.version}>Versão 1.0.0</Text>

                <Button title="Sair" onPress={logout} />

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10,
        justifyContent: 'space-evenly'
    },

    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },

    imageWrapper: {
        position: 'relative',
    },

    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },

    editButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: colors.greenPrimary,
        borderRadius: 20,
        padding: 6,
    },

    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        color: colors.font,
    },

    role: {
        color: '#777',
    },

    cards: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },

    card: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 5,
    },

    cardText: {
        marginTop: 5,
        fontSize: 13,
        textAlign: 'center',
        color: colors.font,
    },

    section: {
        marginTop: 10,
        paddingHorizontal: 10
    },

    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.font,
    },

    list: {
        //    backgroundColor: '#f9f9f9',
        borderRadius: 10,
        paddingHorizontal: 10,
    },

    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd',
    },

    left: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    itemText: {
        fontSize: 15,
        color: colors.font,
    },

    version: {
        textAlign: 'center',
        marginTop: 20,
        color: '#999',
        fontSize: 12,
    },
});