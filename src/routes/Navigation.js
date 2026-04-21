import { createStackNavigator } from '@react-navigation/stack';

import { Login } from '../pages/Login';
import { RecuperarAcesso } from '../pages/RecuperarAcesso';
import { ResetarSenha } from '../pages/ResetarSenha';

const Stack = createStackNavigator();

export default function Navigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='Login'
                component={Login}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='RecuperarAcesso'
                component={RecuperarAcesso}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='ResetarSenha'
                component={ResetarSenha}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}