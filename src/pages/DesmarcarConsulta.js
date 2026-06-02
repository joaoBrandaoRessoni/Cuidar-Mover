import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../theme/colors";

export default function DesmarcarConsulta({ navigation }) {
  const [selected, setSelected] = useState(1);
  const [observations, setObservations] = useState("");
  const [other, setOther] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const options = [
    {
      id: 1,
      descricao: "Tenho outro compromisso",
    },
    {
      id: 2,
      descricao: "Falta de transporte",
    },
    {
      id: 3,
      descricao: "Outro",
    },
  ];

  const handleSubmit = () => {
    Alert.alert(
      "Consulta desmarcada",
      "Alguém entrará em contato para remarcar sua consulta.",
      [
        {
          text: "OK",
          onPress: () => {
            if (navigation) navigation.navigate("Home");
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>Qual o motivo?</Text>
            <Text style={styles.subtitle}>
              Nos conte o motivo de desmarcar para que possamos entender como te
              ajudar.
            </Text>
          </View>

          <View style={styles.container}>
            {options.map((e, i) => (
              <TouchableOpacity
                key={`Option-${i}`}
                style={styles.radioContainer}
                onPress={() => setSelected(e.id)}
              >
                <View style={styles.outerCircle}>
                  {selected === e.id && <View style={styles.innerCircle} />}
                </View>
                <Text style={styles.radioText}>{e.descricao}</Text>
              </TouchableOpacity>
            ))}

            {selected == 3 ? (
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Escreva brevemente o motivo"
                  placeholderTextColor={colors.textMuted}
                  textAlignVertical="top"
                  multiline
                  numberOfLines={4}
                  value={other}
                  onChangeText={setOther}
                  maxLength={100}
                />
                <Text style={styles.charCount}>{observations.length}/100</Text>
              </View>
            ) : (
              ""
            )}
          </View>

          <View style={styles.observationsSection}>
            <Text style={styles.sectionTitle}>Comentário Adicional</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Digite seu comentário caso houver..."
                placeholderTextColor={colors.textMuted}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={observations}
                onChangeText={setObservations}
                maxLength={500}
              />
              <Text style={styles.charCount}>{observations.length}/500</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footerContainer}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleSubmit}
            disabled={isSubmitting}
            style={[
              styles.submitButton,
              isSubmitting && styles.submitButtonDisabled,
            ]}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? "Desmarcando..." : "Desmarcar Consulta"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },

  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.text,
    lineHeight: 38,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.greenPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: colors.greenPrimary,
  },
  radioText: {
    marginLeft: 10,
    fontSize: 16,
  },

  observationsSection: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 10,
  },
  textInputContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    overflow: "hidden",
  },
  textInput: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    padding: 16,
    minHeight: 110,
  },
  charCount: {
    fontSize: 11,
    color: colors.textMuted,
    textAlign: "right",
    paddingRight: 16,
    paddingBottom: 10,
  },

  footerContainer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 8 : 20,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  submitButton: {
    backgroundColor: colors.greenPrimary,
    borderRadius: 8,
    paddingVertical: 17,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.greenPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonDisabled: {
    backgroundColor: colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
});
