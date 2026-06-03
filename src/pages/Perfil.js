import { memo, useEffect, useState } from "react";
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import Button from "../components/Button";
import MetaSemanal from "../components/MetaModal";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import {
    requestMediaLibraryPermissionsAsync,
    launchImageLibraryAsync,
    MediaTypeOptions,
} from "expo-image-picker";
import useStorageTimeStamp from "../hooks/useStorageTimeStamp";

const { width, height } = Dimensions.get("window");

export const Perfil = () => {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        percentCompleted: 0,
        userId: "",
        userImage: null,
    });

    console.log('profile', profile)

    const isFocused = useIsFocused();
    const [shouldGetProfile, setShouldGetProfile] = useState(false);
    const { authenticate, logOut } = useAuth();
    const navigation = useNavigation();
    const { getItemFromAsyncStorage, setItemToAsyncStorage } = useStorageTimeStamp()

    useEffect(() => {
        const getProfile = async () => {
            const profile = await AsyncStorage.getItem("profile")

            setProfile(JSON.parse(profile))
        }

        getProfile()

    }, [])

    useEffect(() => {
        if (!isFocused) return;

        const getProfile = async () => {
            try {
                const token = await authenticate();

                if (!token) {
                    await logOut(() => navigation.navigate("Login"))
                    return
                }

                console.log(shouldGetProfile)

                const profile = await getItemFromAsyncStorage("profile")

                if (!profile || shouldGetProfile) {
                    const response = await axios.get(
                        `${process.env.EXPO_PUBLIC_API_URL}/app/home/profile`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    );

                    const responseFoto = await axios.get(
                        `${process.env.EXPO_PUBLIC_API_URL}/app/home/profile/photo/${response.data.profile.id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            responseType: "arraybuffer",
                        },
                    );

                    let searchProfile = {
                        name: response?.data?.profile?.name,
                        email: response?.data?.profile?.email,
                        percentCompleted: response?.data?.weeklyProgress?.percentCompleted,
                        userId: response?.data?.profile?.id,
                        userImage: responseFoto?.request._response,
                    }

                    setItemToAsyncStorage("profile", searchProfile)

                    setProfile(searchProfile);

                    setShouldGetProfile(false);

                } else {
                    setProfile(profile);
                }

            } catch (error) {
                if (error.response) {
                    if (error.response.status == 401) {
                        await logOut(() => navigation.navigate("Login"))
                        return
                    }
                }

                console.log(error)

                Alert.alert('Erro', 'Ocorreu um erro inesperado ao tentar buscar seu perfil');
            }
        };

        getProfile();
    }, [isFocused, shouldGetProfile]);

    const logout = async () => {
        await AsyncStorage.removeItem("access");
        await AsyncStorage.removeItem("refresh_access");

        navigation.navigate("Login");
    };

    const pickImage = async () => {
        // Solicita permissão para acessar a galeria
        const permissionResult = await requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permissão para acessar a galeria é necessária!");
            return;
        }

        // Abre a galeria de imagens
        let result = await launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (result.canceled) {
            return;
        }

        const image = result.assets[0];

        const formData = new FormData();

        formData.append("file", {
            uri: image.uri,
            name: image.fileName || "foto.jpg",
            type: image.mimeType || "image/jpeg",
        });

        try {
            const token = await authenticate();

            if (!token) {
                await logOut(() => navigation.navigate("Login"))
                return
            }

            const response = await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/app/home/profile/photo`,
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    }
                },
            );

            setShouldGetProfile(true);

            Alert.alert("Imagem Salva! ✅", "Sua imagem foi salva com sucesso.");
        } catch (error) {
            console.log('status:', error?.response?.status)
            console.log('data:', error?.response?.data)
            console.log('message:', error?.message)
            if (error.response) {
                if (error.response.status == 401) {
                    await logOut(() => navigation.navigate("Login"))
                    return
                }
            }

            Alert.alert("Erro", "Não foi possível salvar a foto. Tente novamente.");
        }
    };

    const config = [
        {
            id: 1,
            iconName: "alarm-outline",
            title: "Lembretes",
            iconeDireita: "chevron-forward",
        },
        {
            id: 2,
            iconName: "notifications-outline",
            title: "Notificações",
            iconeDireita: "chevron-forward",
        },
        {
            id: 3,
            iconName: "shield-checkmark-outline",
            title: "Privacidade e Dados",
            iconeDireita: "chevron-forward",
        },
    ];

    const ItemTabela = memo(({ iconName, title, iconeDireita }) => (
        <TouchableOpacity style={styles.item}>
            <View style={styles.left}>
                <Ionicons name={iconName} size={22} color={colors.greenPrimary} />
                <Text style={styles.itemText}>{title}</Text>
            </View>

            <Ionicons name={iconeDireita} size={20} color="#999" />
        </TouchableOpacity>
    ));

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>

                <View style={styles.profileContainer}>
                    <View style={styles.imageWrapper}>

                        <Image
                            source={
                                profile?.userImage
                                    ? { uri: `data:image/png;base64,${profile.userImage}` }
                                    : require("../../assets/imagens/imgperfil.jpg")
                            }
                            style={styles.image}
                        />
                        <TouchableOpacity style={styles.editButton} onPress={pickImage}>
                            <Ionicons name="pencil" size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.name}>{profile?.name}</Text>
                </View>

                <View style={styles.cards}>
                    <View style={styles.card}>
                        <Ionicons
                            name="checkmark-circle-outline"
                            size={24}
                            color={colors.greenPrimary}
                        />
                        <Text style={styles.cardText}>24 sessões realizadas</Text>
                    </View>

                    <View style={styles.card}>
                        <Ionicons
                            name="calendar-outline"
                            size={24}
                            color={colors.greenPrimary}
                        />
                        <Text style={styles.cardText}>Próxima sessão</Text>
                    </View>
                    <View style={styles.card}>
                        <Ionicons
                            name="body-outline"
                            size={24}
                            color={colors.greenPrimary}
                        />
                        <Text style={styles.cardText}>Especialistas Ortopédicos</Text>
                    </View>
                </View>

                <MetaSemanal progresso={profile?.percentCompleted} />

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Configurações e Suporte</Text>

                    <View style={styles.list}>
                        {config.map((item) => (
                            <ItemTabela key={item.id} {...item} />
                        ))}
                    </View>
                </View>

                <Text style={styles.version}>Versão 1.0.0</Text>

                <Button title="Sair" onPress={logout} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: "space-evenly",
    },

    profileContainer: {
        alignItems: "center",
        marginBottom: 20,
    },

    imageWrapper: {
        position: "relative",
    },

    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },

    editButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: colors.greenPrimary,
        borderRadius: 20,
        padding: 6,
    },

    name: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        color: colors.font,
    },

    role: {
        color: "#777",
    },

    cards: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5,
    },

    card: {
        flex: 1,
        backgroundColor: "#f7f7f7",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginHorizontal: 5,
    },

    cardText: {
        marginTop: 5,
        fontSize: 13,
        textAlign: "center",
        color: colors.font,
    },

    section: {
        marginTop: 10,
        paddingHorizontal: 10,
    },

    sectionTitle: {
        fontWeight: "bold",
        marginBottom: 10,
        color: colors.font,
    },

    list: {
        borderRadius: 10,
        paddingHorizontal: 10,
    },

    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: "#ddd",
    },

    left: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    itemText: {
        fontSize: 15,
        color: colors.font,
    },

    version: {
        textAlign: "center",
        marginTop: 10,
        padding: 10,
        color: "#999",
        fontSize: 12,
    },
});
