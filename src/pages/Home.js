import { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  StyleSheet,
  FlatList,
  Modal,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MetaCardDiario from "../components/MetaCardDiario";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import HeaderHome from "../components/HeaderHome";
import CardConsulta from "../components/CardConsulta";
import CardExercicio from "../components/CardExercicio";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import useStorageTimeStamp from "../hooks/useStorageTimeStamp";

export const Home = ({ route }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    percentCompleted: 0,
  });
  const isFocused = useIsFocused();
  const { authenticate, logOut } = useAuth();
  const [exercicios, setExercicios] = useState([]);
  const { getItemFromAsyncStorage } = useStorageTimeStamp()

  const handleDesmarcar = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    if (!isFocused) return;

    const getProfile = async () => {
      try {
        const token = await authenticate();

        if (!token) {
          await logOut(() => navigation.navigate("Login"));
          return;
        }

        const profile = await getItemFromAsyncStorage("profile");

        if (!profile) {
          const response = await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/app/home/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          const responseFoto = await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/app/home/profile/photo/${response.data.profile.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              responseType: "arraybuffer",
            },
          );

          let searchProfile = {
            name: response.data.profile.name,
            email: response.data.profile.email,
            percentCompleted: response.data.weeklyProgress.percentCompleted,
            userId: response.data.profile.id,
            userImage: responseFoto.request._response,
          };

          setProfile(searchProfile);
        } else {
          setProfile(profile);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status == 401) {
            await logOut(() => navigation.navigate("Login"));
            return;
          }
        }

        console.log(error)

        Alert.alert(
          "Erro",
          "Ocorreu um erro inesperado ao tentar buscar seu perfil",
        );
      }
    };

    const getExercices = async () => {
      try {
        const token = await authenticate();

        if (!token) {
          await logOut(() => navigation.navigate("Login"));
          return;
        }

        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/app/home/plan/exercises`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        let exer = response.data.items.map((e) => {
          return {
            id: e.prescriptionItemId,
            foto: require("../../assets/imagens/alogamento.png"),
            title: e.title,
            text: e.taxonomy.objective,
            status: e.completedToday ? "concluido" : "pendente",
          };
        });

        setExercicios(exer);
      } catch (error) {
        if (error.response) {
          if (error.response.status == 401) {
            await logOut(() => navigation.navigate("Login"));
            return;
          }
        }

        Alert.alert(
          "Erro",
          "Ocorreu um erro ao tentar buscar os seus exercícios",
        );
      }
    };

    getProfile();
    getExercices();
  }, [isFocused]);

  useEffect(() => {
    if (route.params?.message && route.params?.level == "error") {
      Alert.alert("Erro", route.params.message);
    }
  }, []);

  return (
    <View style={{ paddingHorizontal: 10, marginVertical: 10, flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <HeaderHome />
      <MetaCardDiario progresso={profile.percentCompleted} />
      <View style={styles.view}>
        <Text style={styles.sectionTitle}>Próxima Sessão</Text>

        <CardConsulta
          title="Dra. Patrícia Mendes"
          text="Amanhã ás 14:30h"
          local="Posto de Saúde, Centro"
          icon="calendar-clear-outline"
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
                id={item.id}
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

        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Tem certeza?</Text>

              <Text style={styles.modalText}>Deseja remarcar a consulta?</Text>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.btnCancelar}
                  onPress={() => setModalVisible(false)}
                >
                  <Text>Não</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btnConfirmar}
                  onPress={() => {
                    navigation.navigate("DesmarcarConsulta");
                    setModalVisible(false);
                  }}
                >
                  <Text style={{ color: "#fff" }}>Sim</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.font,
    fontSize: 16,
  },
  view: {
    paddingVertical: 10,
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
  },
});
