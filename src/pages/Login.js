
import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button'
import Input from '../components/Input'
import { colors } from '../theme/colors'
import Footer from '../components/Footer';
import FeedbackCard from '../components/FeedbackCard/FeedbackCard';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height, width } = Dimensions.get("window");

export const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [feedback, setFeedback] = useState({
    message: "",
    type: "error",
  });

useEffect(() => {
    const getAppId = async () => {
      try {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/api/v1/auth/apps`,
        );

        await AsyncStorage.setItem("appId", String(response.data[0].id));
      } catch (error) {
        console.log("Erro ao buscar appId:", error);
        console.log("Mensagem:", error.message);

        if (error.response) {
          console.log("Resposta backend:", error.response.data);
        }
      }
    };

    getAppId();
  }, []);

  const handleSubmit = async () => {
    if (!senha && !email) {
      setFeedback({
        message: "Campos vazios, digite o e-mail e senha para prosseguir.",
        type: "error",
      });
      return;
    }

    if (senha && email) {
      try {
        const appId = await AsyncStorage.getItem("appId");

        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_API_URL}/api/v1/auth/login`,
          {
            email: email,
            password: senha,
            accessMode: "APP",
            appId: parseInt(appId ?? "0"),
          },
        );

        AsyncStorage.setItem("access_token", response.data.access_token);
        AsyncStorage.setItem("user", JSON.stringify(response.data.user));

        setFeedback({
          message: "Login feito com sucesso.",
          type: "success",
        });
        return;
      } catch (error) {
        setFeedback({
          message: `${error}`,
          type: "error",
        });
      }
    }

    setFeedback({ message: "", type: "error" });
  };

  return (
    <ImageBackground
      source={require("../../assets/imagens/capa.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.top}>
          <Image
            source={require("../../assets/imagens/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.titulo}>Acesse sua conta</Text>
        </View>

        <View style={styles.viewLogin}>
          <Input
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType={"email-address"}
          />

          <Input
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={true}
          />

          <View style={{ alignItems: "flex-end", paddingHorizontal: 35 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ResetarSenha")}
            >
              <Text style={styles.txtVerde}>Recuperar Senha</Text>
            </TouchableOpacity>
          </View>

          <Button
            title="Acessar"
            onPress={handleSubmit}
            color={colors.greenPrimary}
          />
        </View>

        <View style={styles.rodape}>
          <Text style={styles.txt}>Não possui uma conta?</Text>
          <Button
            title="Criar Conta"
            onPress={() => console.log("Clicou")}
            color="transparent"
            borderColor={colors.greenPrimary}
            textColor={colors.greenPrimary}
            onPress={() => navigation.navigate("RecuperarAcesso")}
          />
        </View>
        <FeedbackCard type={feedback.type} message={feedback.message} />
        <Footer />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)", // controla a escuridão
  },

  viewLogin: {
    gap: 24,
  },
  top: {
    paddingTop: 25,
    alignItems: "center",
    gap: 10,
  },
  logo: {
    marginTop: 45,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 700,
    color: colors.grayLight,
    textAlign: "center",
    paddingVertical: 25,
  },
  txtVerde: {
    color: colors.greenPrimary,
  },
  rodape: {
    paddingTop: 45,
  },
  txt: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 10,
  },
});
