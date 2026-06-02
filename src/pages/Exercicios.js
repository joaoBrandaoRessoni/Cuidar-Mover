import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { InfoCard } from "../components/InfoCard";
import { PassoItem } from "../components/PassoItem";
import { VideoPlaceholder } from "../components/Video";
import { DicaFisioterapeuta } from "../components/CardDicas";
import { useIsFocused } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const TagCategoria = ({ label }) => (
  <View style={styles.tag}>
    <Text style={styles.tagText}>{label.toUpperCase()}</Text>
  </View>
);

export default function Exercicios({ navigation, route }) {
  const [concluido, setConcluido] = useState(route.params.concluido);
  const isFocused = useIsFocused();
  const { authenticate, logOut } = useAuth();
  const [exercicioData, setExercicioData] = useState(null);

  const handleConcluir = async () => {
    try {
      const token = await authenticate();

      if (!token) {
        await logOut(() => navigation.navigate("Login"))
        return
      }

      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/app/home/plan/exercises/${route.params.id ?? ""}/complete`,
        undefined,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setConcluido(true);
      navigation.navigate("Feedback", { id: response.data.executionId });
    } catch (error) {
      if (error.response) {
        if(error.response.status == 401){
          await logOut(() => navigation.navigate("Login"));
          return
        }
      }

      navigation.navigate("Home", {
        message: "Houve um erro ao concluir seu exercício",
        level: "error",
      });
    }
  };

  useEffect(() => {
    const getExercice = async () => {
      try {
        const token = await authenticate();

        if (!token) {
          await logOut(() => navigation.navigate("Login"))
          return
        }

        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/app/home/plan/exercises/${route.params.id ?? ""}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setExercicioData({
          titulo: response.data.title,
          categorias: [
            response.data.taxonomy.axis,
            response.data.taxonomy.problem,
            response.data.taxonomy.objective,
          ],
          series: response.data.metrics.series,
          repeticoes: response.data.metrics.volume,
          videoThumbnail: response.data.videoUrl,
          passos: response.data.steps.map((e, i) => {
            return {
              numero: i,
              titulo: `Passo ${i + 1}`,
              descricao: e.text,
            };
          }),
          dicaFisioterapeuta: {
            texto:
              "Foque na qualidade do movimento, não na carga. Se sentir uma dor aguda, diminua a amplitude e respire profundamente durante a execução.",
            autor: "Dr. Carlos Mendes",
            especialidade: "Fisioterapeuta",
          },
        });
      } catch (error) {
        if (error.response) {
          if(error.response.status == 401){
            await logOut(() => navigation.navigate("Login"))
            return
          }
        }

        navigation.navigate("Home", {
          message: "Houve um erro ao tentar buscar seu exercício",
          level: "error",
        });
      }
    };

    getExercice();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
      {/* <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation?.goBack()}
                >
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detalhe do Exercício</Text>
                <View style={styles.headerRight} />
            </View> */}

      {exercicioData ? (
        <>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.tagsRow}>
              {exercicioData.categorias.map((cat, idx) => (
                <TagCategoria key={idx} label={cat} />
              ))}
            </View>

            <Text style={styles.titulo}>{exercicioData.titulo}</Text>

            {/* <VideoView
                player={player}
                fullscreenOptions={{ enable: true }}
                allowsPictureInPicture
            /> */}

            <VideoPlaceholder
              videoThumbnail={exercicioData.videoThumbnail ?? ""}
            />

            <InfoCard
              series={exercicioData.series}
              repeticoes={exercicioData.repeticoes}
            />

            <View style={styles.section}>
              <Text style={styles.sectionTitulo}>Passo a Passo</Text>
              {exercicioData.passos.map((passo) => (
                <PassoItem key={passo.numero} passo={passo} />
              ))}
            </View>

            <DicaFisioterapeuta dica={exercicioData.dicaFisioterapeuta} />

            <View style={{ height: 24 }} />
          </ScrollView>

          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={[styles.botaoConcluir, concluido && styles.botaoConcluido]}
              onPress={handleConcluir}
              disabled={concluido}
              activeOpacity={0.85}
            >
              <Text style={styles.botaoConcluirTexto}>
                {concluido ? "✓ Exercício Concluído" : "Concluir Exercício"}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        ""
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitulo: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 36,
    height: 36,
    //borderRadius: 18,
    //backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  backArrow: {
    fontSize: 18,
    color: colors.greenPrimary,
    fontWeight: "700",
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    letterSpacing: 0.3,
  },
  headerRight: {
    width: 36,
  },

  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },

  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: colors.tagBg,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#C3E6CC",
  },
  tagText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.greenPrimary,
    letterSpacing: 0.8,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 16,
    lineHeight: 30,
  },
  // Footer / Botão
  footerContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  botaoConcluir: {
    backgroundColor: colors.greenPrimary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: colors.greenPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  botaoConcluido: {
    backgroundColor: "#6B7280",
    elevation: 0,
    shadowOpacity: 0,
  },
  botaoConcluirTexto: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
