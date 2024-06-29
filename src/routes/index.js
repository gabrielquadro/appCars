import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home';
import Details from '../pages/Details';

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (

        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#212121',
                },
                headerTintColor: '#FFD700',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ title: 'Lista de Carros' }}
            />
            <Stack.Screen
                name="Details"
                component={Details}
                options={{ title: 'Detalhes do Carro' }}
            />
        </Stack.Navigator>

    );
}