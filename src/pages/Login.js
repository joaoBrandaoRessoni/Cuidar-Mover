
import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button'
import Input from '../components/Input'
import { colors } from '../theme/colors'
import Footer from '../components/Footer';
import FeedbackCard from '../components/FeedbackCard/FeedbackCard';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';

const { height, width } = Dimensions.get("window");

export const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [feedback, setFeedback] = useState({
        message: "",
        type: "error",
    });

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        const getAppId = async () => {
            try {
                const id = await AsyncStorage.getItem("appId")
                console.log('id', id)
                console.log("process.env.EXPO_PUBLIC_API_URL", process.env.EXPO_PUBLIC_API_URL)
                if (!id) {
                    const response = await axios.get(
                        `${process.env.EXPO_PUBLIC_API_URL}/api/v1/auth/apps`,
                    );

                    console.log('response', response)

                    await AsyncStorage.setItem("appId", String(response.data[0].id));
                }

            } catch (error) {
                console.log("Erro ao buscar appId:", error);
                console.log("Mensagem:", error.message);

                if (error.response) {
                    console.log("Resposta backend:", error.response.data);
                }
            }
        };

        const verifyIfLogedIn = async () => {
            const token = await AsyncStorage.getItem("access_token")

            if (token) {
                navigation.navigate("Home")
            }
        }

        getAppId();
        verifyIfLogedIn();
    }, []);

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility)
    }

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

                console.log("appId", appId)

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

                navigation.navigate("Home")

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
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                                iconName="mail-outline"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType={"email-address"}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                <Input
                                    placeholder="Senha"
                                    iconName="lock-closed-outline"
                                    value={senha}
                                    onChangeText={setSenha}
                                    secureTextEntry={passwordVisibility}
                                />

                                <TouchableOpacity
                                    onPress={togglePasswordVisibility}
                                    style={{ alignItems: 'center', marginBottom: 15 }}>
                                    <Ionicons
                                        name={passwordVisibility ? 'eye-off-outline' : 'eye-outline'}
                                        size={20}
                                        color='#999'
                                        style={{ position: 'absolute', right: 50, alignItems: 'center' }}
                                    />
                                </TouchableOpacity>
                            </View>


                            <View style={{ alignItems: "flex-end", paddingHorizontal: 35 }}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("ResetarSenha")}
                                >
                                    <Text style={styles.txtVerde}>Recuperar Senha</Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                        <View style={{marginVertical: 50}}>
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
                                onPress={() => navigation.navigate("Cadastrar")}
                            />
                        </View>
                        <FeedbackCard type={feedback.type} message={feedback.message} />
                        {/* <Footer /> */}
                    </View>
                </ImageBackground>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
        gap: width * 0.08,
    },
    top: {
        paddingTop: height * 0.09,
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
