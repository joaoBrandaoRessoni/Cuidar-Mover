import { useState } from 'react'
import { View, Text, ImageBackground, Image, StyleSheet, Dimensions } from 'react-native'
import { colors } from '../theme/colors'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import Footer from '../components/Footer'
import FeedbackCard from '../components/FeedbackCard/FeedbackCard'

const { height, width } = Dimensions.get('window');

export const RecuperarAcesso = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [codigo, setCodigo] = useState('');
    const [confirmeSenha, setConfirmeSenha] = useState('');
    const [feedback, setFeedback] = useState({
        message: '',
        type: 'error'
    });
    
    const handleSubmit = () => {
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

        if (senha && confirmeSenha) {
            setFeedback({
                message: 'Senha alterada com sucesso.',
                type: 'success'
            });
            setTimeout(() => {
                navigation.navigate("Login")
            }, 1500);
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
                    <Text style={styles.titulo}>Recuperação de Acesso</Text>
                </View>

                <View style={{ paddingHorizontal: 25 }}>

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

                    <Input
                        placeholder="Senha"
                        iconName="lock-closed-outline"
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry={true}
                    />

                    <Input
                        placeholder="Confirmar senha"
                        iconName="lock-closed-outline"
                        value={confirmeSenha}
                        onChangeText={setConfirmeSenha}
                        secureTextEntry={true}
                    />
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
        </ImageBackground>
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
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.25)',
        flex: 1,
        overflow: 'hidden',
    },
    titulo: {
        fontSize: 20,
        fontWeight: 700,
        color: '#dcdcdc',
        textAlign: 'center',

    },
    txtRedef: {
        color: colors.font,
        paddingVertical: 10,
        textAlign: 'center'
    },
    logo: {
        marginTop: 0
    },
})