import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Navigation from './src/routes/Navigation';
import { RecuperarAcesso } from './src/pages/RecuperarAcesso';
import { Login } from './src/pages/Login';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#fff"
            />
            <Navigation />
        </NavigationContainer>
    );
}