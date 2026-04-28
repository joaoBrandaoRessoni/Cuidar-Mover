import React, { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { Login } from '../pages/Login';
import { RecuperarAcesso } from '../pages/RecuperarAcesso';
import { ResetarSenha } from '../pages/ResetarSenha';
import { colors } from '../theme/colors';
import { Cadastrar } from '../pages/Cadastrar';
import { Home } from '../pages/Home';
import { Agenda } from '../pages/Agenda';
import { Progresso } from '../pages/Progresso';
import { Perfil } from '../pages/Perfil';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ICONS = {
    'Home': 'home',
    'Progresso': 'stats-chart',
    'Agenda': 'calendar',
    'Meu Perfil': 'person',
};


function MainTabNavigator() {

    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({

                tabBarIcon: ({ color, size }) => {
                    const iconName = ICONS[route.name];
                    return <Ionicons name={iconName} size={16} color={color} />;
                },

                tabBarStyle: keyboardVisible ? { display: 'none' } : colors.tabBarStyle,
                tabBarActiveTintColor: colors.greenPrimary,
                tabBarInactiveTintColor: colors.font
            })}
        >
            <Tab.Screen name='Home' options={{ tabBarLabel: 'Início' }} component={Home}  options={{ headerShown: false }} />
            <Tab.Screen name='Agenda' component={Agenda}   options={{ headerShown: false }}/>
            <Tab.Screen name='Progresso' component={Progresso}  options={{ headerShown: false }} />
            <Tab.Screen name='Meu Perfil' component={Perfil} options={{ tabBarLabel: 'Perfil' }}  options={{ headerShown: true }} />
        </Tab.Navigator>
    )
}

export default function Navigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='Login'
                component={Login}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='Home'
                component={MainTabNavigator}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='RecuperarAcesso'
                component={RecuperarAcesso}
                options={{
                    headerShown: true,
                    title: "UNIFAE CARE",
                    headerStyle: {
                        backgroundColor: colors.grayLight,
                    },
                    headerTintColor: colors.greenPrimary,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />

            <Stack.Screen
                name='ResetarSenha'
                component={ResetarSenha}
                options={{
                    headerShown: true,
                    title: "UNIFAE CARE",
                    headerStyle: {
                        backgroundColor: colors.grayLight,
                    },
                    headerTintColor: colors.greenPrimary,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />

            <Stack.Screen
                name='Cadastrar'
                component={Cadastrar}
                options={{
                    headerShown: true,
                    title: "UNIFAE CARE",
                    headerStyle: {
                        backgroundColor: colors.grayLight,
                    },
                    headerTintColor: colors.greenPrimary,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
        </Stack.Navigator>
    )
}