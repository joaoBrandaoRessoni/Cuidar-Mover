import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { colors } from "../theme/colors";
import Card from "../components/Card";
import Input from "../components/Input";
import { useState } from "react";
import Button from "../components/Button";
import FeedbackCard from "../components/FeedbackCard/FeedbackCard";
import axios from "axios";

const { height, width } = Dimensions.get("window");

export const ResetarSenha = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState({
    message: "",
    type: "error",
  });

  const handleSubmit = async () => {
    if (!email) {
      setFeedback({
        message: "Campo vazio, digite o e-mail para prosseguir.",
        type: "error",
      });
      return;
    }

    setFeedback({ message: "", type: "error" });

    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/v1/auth/forgot-password`,
        {
          email: email,
        },
      );

      navigation.navigate("RecuperarAcesso");
    } catch (error) {

      let mensagemErro = "Erro ao solicitar recuperação de acesso.";

      if (error.response?.data?.message) {
        mensagemErro = error.response.data.message;
      }

      setFeedback({
        message: mensagemErro,
        type: "error",
      });
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/imagens/capa.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.top}>
          {/* <Image
            source={require("../../assets/imagens/logo.png")}
            style={styles.logo}
          /> */}
          <Text style={styles.titulo}>Recuperação de Senha</Text>
        </View>

        <View style={{ paddingHorizontal: 25 }}>
          <Text style={styles.txtRedef}>
            Insira seu e-mail para receber um código de 8 dígitos para redefinir
            sua senha.
          </Text>
        </View>

        <View style={{ gap: 15, paddingVertical: 20 }}>
          <Input
            placeholder="E-mail"
            iconName="lock-closed-outline"
            value={email}
            onChangeText={setEmail}
            keyboardType={"email-address"}
          />
        </View>

        <View>
          <Button
            title="Enviar código de recuperação"
            onPress={handleSubmit}
            color={colors.greenPrimary}
          />
        </View>

        <View style={{ paddingHorizontal: 25, paddingVertical: 20 }}>
          <Card
            title="DICA DE SEGURANÇA"
            text="Por motivos de segurança o código expira em 15 minutos. Verifique sua caixa de spam caso não receba o e-mail em instantes."
            icon="information-circle"
            color={colors.greenPrimary}
          />
        </View>

        <FeedbackCard type={feedback.type} message={feedback.message} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  top: {
    alignItems: "center",
    marginTop: 70,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.25)",
    flex: 1,
    overflow: "hidden",
    gap: 20
  },
  titulo: {
    fontSize: 20,
    fontWeight: 700,
    color: "#dcdcdc",
    textAlign: "center",
  },
  txtRedef: {
    color: colors.font,
    paddingVertical: 10,
    textAlign: "center",
  },
  logo: {
    marginTop: 0,
  },
});
