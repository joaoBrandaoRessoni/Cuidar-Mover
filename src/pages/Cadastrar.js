import { useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button'
import Input from '../components/Input'
import { colors } from '../theme/colors'
import Footer from '../components/Footer';
import FeedbackCard from '../components/FeedbackCard/FeedbackCard';

const { height, width } = Dimensions.get('window');

export const Cadastrar = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmeSenha, setConfirmeSenha] = useState('');
    const [feedback, setFeedback] = useState({
        message: '',
        type: 'error'
    });

    const handleSubmit = () => {
        if (!senha && !email) {
            setFeedback({
                message: 'Campos vazios, preencha os campos para prosseguir.',
                type: 'error'
            });
            return;
        }

        if (senha !== confirmeSenha) {
            setFeedback({
                message: 'As senhas são diferentes. Tente novamente',
                type: 'error'
            });
            return;
        }

        if (senha && email) {
            setFeedback({
                message: 'Login feito com sucesso.',
                type: 'success'
            });
            return;
        }

        setFeedback({ message: '', type: 'error' });
    };

    return (
        <ImageBackground
            source={require('../../assets/imagens/capa.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <View style={styles.top}>
                    <Image source={require("../../assets/imagens/logo.png")} style={styles.logo} />
                    <Text style={styles.titulo}>Cadastre sua conta</Text>
                </View>

                <View style={styles.viewLogin}>
                    <Input
                        placeholder="E-mail"
                        iconName="mail-outline"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType={"email-address"}
                    />

                    <Input
                        placeholder="Senha"
                        iconName="lock-closed-outline"
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry={true}
                    />

                    <Input
                        placeholder="Confirme sua senha"
                        iconName="lock-closed-outline"
                        value={confirmeSenha}
                        onChangeText={setConfirmeSenha}
                        secureTextEntry={true}
                    />

                    <Button
                        title="Cadastrar"
                        onPress={handleSubmit}
                        color={colors.greenPrimary}
                    />
                </View>

                
                <FeedbackCard
                    type={feedback.type}
                    message={feedback.message}
                />

                <View style={styles.rodape}>
                    <Text style={styles.txt}>Já possui conta?</Text>
                    <Button
                        title="Voltar para o login"
                        onPress={() => navigation.navigate('Login')}
                        color="transparent"
                        borderColor={colors.greenPrimary}
                        textColor={colors.greenPrimary}
                    />
                </View>

            </View>
        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: width,
        height: height,
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.25)', // controla a escuridão 
    },

    viewLogin: {
        gap: 24
    },
    top: {
        paddingTop: 10,
        alignItems: 'center',
        gap: 10
    },
    logo: {
        marginTop: 20
    },
    titulo: {
        fontSize: 20,
        fontWeight: 700,
        color: colors.grayLight,
        textAlign: 'center',
        paddingVertical: 25
    },
    txtVerde: {
        color: colors.greenPrimary
    },
    rodape: {
        paddingTop: 25
    },
    txt: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 10
    }
})