import { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StatusBar, StyleSheet, FlatList, Modal } from "react-native";
import { useNavigation } from '@react-navigation/native';
import MetaCardDiario from "../components/MetaCardDiario";
import { Ionicons } from '@expo/vector-icons';
import { colors } from "../theme/colors";
import HeaderHome from "../components/HeaderHome";
import CardConsulta from "../components/CardConsulta";
import CardExercicio from "../components/CardExercicio";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

export const Home = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [profile, setProfile] = useState({ name: "", email: "", percentCompleted: 0 })
    const isFocused = useIsFocused();

    const handleDesmarcar = () => {
        setModalVisible(true);
    };

    const exercicios = [
        {
            id: '1',
            foto: require("../../assets/imagens/alogamento.png"),
            title: "Alongamento Cervical",
            text: "3 séries x 30 seg.",
            status: "concluido"
        },
        {
            id: '2',
            foto: require("../../assets/imagens/fortalecimento.png"),
            title: "Fortalecimento Lombar",
            text: "2 séries x 15 repetições",
            status: "pendente"
        },
        {
            id: '3',
            foto: require("../../assets/imagens/mobilidade.png"),
            title: "Mobilidade de Ombro",
            text: "3 séries x 12 repetições",
            status: "bloqueado"
        },
    ];


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


    return (
        <View style={{ paddingHorizontal: 10, marginVertical: 10, flex: 1 }}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#fff"
            />
            <HeaderHome />
            <MetaCardDiario />
            <View style={styles.view}>
                <Text style={styles.sectionTitle}>Próxima Sessão</Text>

                <CardConsulta
                    title="Dra. Patrícia Mendes"
                    text="Amanhã ás 14:30h"
                    local="Posto de Saúde, Centro"
                    icon='calendar-clear-outline'
                    color={colors.greenPrimary}
                    onDesmarcar={handleDesmarcar}
                />
            </View>
            <View style={[styles.view, { flex: 1 }]}>
                <Text style={styles.sectionTitle}>Exercícios do Dia</Text>

                <View style={{ gap: 15 }}>

                    <FlatList
                        style={{ marginBottom: 10 }}
                        data={exercicios}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <CardExercicio
                                foto={item.foto}
                                title={item.title}
                                text={item.text}
                                status={item.status}
                            />
                        )}
                        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>
                                    Nenhum exercício disponível hoje!
                                </Text>
                            </View>
                        }
                    />
                </View>

                <Modal
                    visible={modalVisible}
                    transparent
                    animationType="fade"
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>

                            <Text style={styles.modalTitle}>
                                Tem certeza?
                            </Text>

                            <Text style={styles.modalText}>
                                Deseja desmarcar a consulta?
                            </Text>

                            <View style={styles.modalButtons}>

                                <TouchableOpacity
                                    style={styles.btnCancelar}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text>Cancelar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.btnConfirmar}
                                    onPress={() => {
                                        console.log("Consulta desmarcada");
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text style={{ color: "#fff" }}>Desmarcar</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.font,
        fontSize: 16
    },
    view: {
        paddingVertical: 10
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalText: {
        fontSize: 14,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 10,
    },
    btnCancelar: {
        padding: 10,
    },
    btnConfirmar: {
        backgroundColor: colors.greenPrimary,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
    },
    
    emptyText: {
        fontSize: 16,
        color: "#9CA3AF",
    }

})