import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Navigation from './src/routes/Navigation';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Navigation />
        </NavigationContainer>
    );
}
