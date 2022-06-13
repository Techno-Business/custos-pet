import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'react-native';
import { colors } from './assets/theme.json';

import { navigationRef } from './services/navigation';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AddPet from './pages/AddPet';

const Stack = createStackNavigator();

const Routes = () => {
    return (
        <>
            <StatusBar backgroundColor={ colors.brand } />
            <NavigationContainer ref={ navigationRef }>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name="Login"
                        component={ Login }
                    />
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name="Signup"
                        component={ Signup }
                    />
                     <Stack.Screen
                        options={{ headerShown: false }}
                        name="Home"
                        component={ Home }
                    />
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name="AddPet"
                        component={ AddPet }
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

export default Routes;