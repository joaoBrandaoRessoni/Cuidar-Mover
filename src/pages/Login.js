import { useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button'
import Input from '../components/Input'
import { colors } from '../theme/colors'

export const Login = () => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    return (

        <ImageBackground
            source={require('../../assets/imagens/capa.png')}
            style={styles.background}
            resizeMode="cover"
        >

            <View style={styles.overlay}>
                <View style={styles.top}>
                    <Image source={require("../../assets/imagens/logo.png")} style={styles.logo} />
                    <Text style={styles.titulo}>Acesse sua conta</Text>
                </View>

                <View style={styles.viewLogin}>
                    <Input
                        placeholder="E-mail"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Input
                        placeholder="Senha"
                        value={senha}
                        onChangeText={setSenha}
                    />

                    <View style={{ alignItems: 'flex-end', paddingHorizontal: 35 }}>
                        <TouchableOpacity>
                            <Text style={styles.txtVerde}>Recuperar Senha</Text>
                        </TouchableOpacity>
                    </View>

                    <Button
                        title="Acessar"
                        onPress={() => console.log('Clicou')}
                        color={colors.greenPrimary}
                    />
                </View>

                <View style={styles.rodape}>
                    <Text style={styles.txt}>Não possui uma conta?</Text>
                    <Button
                        title="Criar Conta"
                        onPress={() => console.log('Clicou')}
                        color="transparent"
                        borderColor={colors.greenPrimary}
                        textColor={colors.greenPrimary}
                        onPress={() => navigation.navigate("RecuperarAcesso")}
                    />
                </View>
            </View>
        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
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
        alignItems: 'center',
        gap: 10
    },
    logo: {
        marginTop: 45
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
        paddingVertical: 50
    },
    txt: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 10
    }
})