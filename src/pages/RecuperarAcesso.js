import { useState } from 'react'
import { View, Text, ImageBackground, Image, StyleSheet, Dimensions } from 'react-native'
import { colors } from '../theme/colors'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import Footer from '../components/Footer'

const { height, width } = Dimensions.get('window');

export const RecuperarAcesso = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [codigo, setCodigo] = useState('');
    const [confirmeSenha, setConfirmeSenha] = useState('');

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
                    />
                </View>

                <View style={{ gap: 15, paddingVertical: 20 }}  >
                    <Input
                        placeholder="E-mail"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Input
                        placeholder="Código de verificação"
                        value={codigo}
                        onChangeText={setCodigo}
                    />

                    <Input
                        placeholder="Senha"
                        value={senha}
                        onChangeText={setSenha}
                    />

                    <Input
                        placeholder="Confirmar senha"
                        value={confirmeSenha}
                        onChangeText={setConfirmeSenha}
                    />
                </View>

                <View>
                    <Button
                        title="Atualizar Senha"
                        onPress={() => console.log('Clicou')}
                        color={colors.greenPrimary}
                    />
                </View>

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