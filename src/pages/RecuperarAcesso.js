import { useState, useEffect } from 'react'
import { View, Text, ImageBackground, Image, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, ScrollView, TouchableOpacity } from 'react-native'
import { colors } from '../theme/colors'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import Footer from '../components/Footer'
import FeedbackCard from '../components/FeedbackCard/FeedbackCard'
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

export const RecuperarAcesso = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [codigo, setCodigo] = useState('');
    const [confirmeSenha, setConfirmeSenha] = useState('');
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(true);
    const [feedback, setFeedback] = useState({
        message: '',
        type: 'error'
    });

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisibility(!confirmPasswordVisibility);
    };

    const handleSubmit = async () => {
        if (!senha || !email || !codigo || !confirmeSenha) {
            setFeedback({
                message: 'Campos vazios, todos os campos devem estar preenchidos.',
                type: 'error'
            });

            return;
        }

        if (senha != confirmeSenha) {
            setFeedback({
                message: 'Ambas as senhas digitadas precisam ser iguais',
                type: 'error'
            });
            return;
        }

        if (senha && confirmeSenha && codigo) {
            try {
                const response = await axios.post(
                    `${process.env.EXPO_PUBLIC_API_URL}/auth/reset-password`,
                    {
                        email: email,
                        code: codigo,
                        password: senha,
                        confirmPassword: confirmeSenha
                    }
                );

                setFeedback({
                    message: response.data.message,
                    type: 'success'
                });

                setTimeout(() => {
                    navigation.navigate("Login");
                }, 1500);

                return;

            } catch (error) {
                if (error.response) {
                    setFeedback({
                        message: error.response.data?.message || 'Erro ao alterar senha.',
                        type: 'error'
                    });

                } else if (error.request) {
                    setFeedback({
                        message: 'Servidor não respondeu.',
                        type: 'error'
                    });

                } else {
                    setFeedback({
                        message: 'Erro inesperado.',
                        type: 'error'
                    });
                }
            }
        }

        setFeedback({ message: '', type: 'error' });
    };

    return (

        <ImageBackground
            source={require('../../assets/imagens/capa.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.overlay}>
                            <View style={styles.top}>
                                {/* <Image source={require("../../assets/imagens/logo.png")} style={styles.logo} /> */}
                                <Text style={styles.titulo}>Recuperação de Acesso</Text>
                            </View>

                            <View style={{ paddingHorizontal: 25, }}>

                                <Text style={styles.txtRedef}>Redefina sua senha para continuar acessando seus dados clínicos e acadêmicos com total segurança</Text>

                                <Card
                                    title="DICA DE SEGURANÇA"
                                    text="Use ao menos 8 caracteres, incluindo letras maiúsculas, números, e um símbolo especial."
                                    icon='shield-checkmark'
                                    color={colors.greenPrimary}
                                />
                            </View>

                            <View style={{ gap: 15, paddingVertical: 20 }}  >
                                <Input
                                    placeholder="E-mail"
                                    iconName="mail-outline"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType={"email-address"}
                                />
                                <Input
                                    placeholder="Código de verificação"
                                    iconName="key-outline"
                                    value={codigo}
                                    onChangeText={setCodigo}
                                />


                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Input
                                        placeholder="Senha"
                                        iconName="lock-closed-outline"
                                        value={senha}
                                        onChangeText={setSenha}
                                        secureTextEntry={passwordVisibility}
                                    />
                                    <TouchableOpacity onPress={togglePasswordVisibility} style={{ alignItems: 'center', marginBottom: 15 }}>
                                        <Ionicons
                                            name={passwordVisibility ? 'eye-off-outline' : 'eye-outline'}
                                            size={20}
                                            color='#999'
                                            style={{ position: 'absolute', right: 50, alignItems: 'center' }}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                    <Input
                                        placeholder="Confirmar senha"
                                        iconName="lock-closed-outline"
                                        value={confirmeSenha}
                                        onChangeText={setConfirmeSenha}
                                        secureTextEntry={confirmPasswordVisibility}
                                    />
                                    <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={{ alignItems: 'center', marginBottom: 15 }}>
                                        <Ionicons
                                            name={confirmPasswordVisibility ? 'eye-off-outline' : 'eye-outline'}
                                            size={20}
                                            color='#999'
                                            style={{ position: 'absolute', right: 50, alignItems: 'center' }}
                                        />
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View>
                                <Button
                                    title="Atualizar Senha"
                                    onPress={handleSubmit}
                                    color={colors.greenPrimary}
                                />
                            </View>

                            <FeedbackCard
                                type={feedback.type}
                                message={feedback.message}
                            />

                            {/* <Footer /> */}
                        </View>

                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground >

    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: width,
        height: height,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    top: {
        marginTop: 35,
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.25)',
        flex: 1,
        overflow: 'hidden',
        gap: 10,

    },
    titulo: {
        fontSize: 20,
        fontWeight: 700,
        color: '#dcdcdc',
        textAlign: 'center',
        paddingVertical: 10 ,

    },
    txtRedef: {
        color: colors.font,
        paddingBottom: 25,
        textAlign: 'center'
    },
    logo: {
        marginTop: 0
    },
})