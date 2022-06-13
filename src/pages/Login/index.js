import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { setUser as setUserAction, loginUser, setReducer, setForm } from './../../store/modules/app/actions';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Box, Cover, Spacer, Title, Button, TextInput, ExtraView, ExtraText, TextLink, TextLinkContent, ActivityIndicator } 
from '../../components';
import logoCustoPet from './../../assets/logoCustosPET.png';

import LoginSchema from './../../schemas/login.schema';

import KeyboardAvoidingWrapper from './../../components/Keyboard/KeyboardAvoidingWrapper';

import { navigate, replace } from './../../services/navigation';

const Login = () => {
    const [hidePassword, setHidePassword] = useState(true);

    const [loggedState, setLoggedState] = useState(false);

    const dispatch = useDispatch();
    const { userForm, form } = useSelector((state) => state.app);

    const setUser = (payload) => {
        dispatch(setUserAction(payload));
    };

    const getLoggedState = async () => {
        await AsyncStorage.clear();
        const user = await AsyncStorage.getItem('@user');

        if (user) {
            dispatch(setReducer('user', JSON.parse(user)));
            dispatch(setForm({ loading: true }));
            replace('Home');
        }
        else setLoggedState(true); 
    };

    useEffect(() => {
        getLoggedState();
    }, []);
    
    const sendLogin = async () => {
        try {
            await LoginSchema.validate(userForm);
            dispatch(loginUser());
        } catch ({ errors }) {
            Alert.alert(errors[0], 'correct the error before continuing');
        }
    };

    return (
        <KeyboardAvoidingWrapper>
            <Box hasPadding background="primary">
                <Spacer size="60px"/>
                <Cover source={logoCustoPet} width="200px" height="140px" spacing="0px auto" transparent/>
                <Spacer size="30px"/>

                {!loggedState && (
                    <>
                        <Spacer size="70px"/> 
                        <ActivityIndicator color="brand" size="large"/>
                    </>       
                )}

                {loggedState && (
                    <>
                     <Title medium>Account Login</Title>
                        <Spacer size="30px"/>
                        <TextInput 
                            label="Email" 
                            placeholder="example@gmail.com" 
                            left={<TextInput.Icon name="email" color="#F0560A"/>}
                            keyboardType="email-address"
                            disabled={form?.loading}
                            value={userForm?.email}
                            onChangeText={(email) => {
                            setUser({ email });
                            }}
                        ></TextInput>
                        <Spacer size="15px"/>
                        <TextInput 
                            label="Password" 
                            placeholder="* * * * * * * * *" 
                            secureTextEntry={hidePassword}
                            left={<TextInput.Icon name="lock" color="#F0560A"/>}
                            right={<TextInput.Icon name={hidePassword ? "eye-off" : 'eye'} color="#9CA3AF" onPress={() => setHidePassword(!hidePassword)}/>} 
                            disabled={form?.loading}
                            value={userForm?.password}
                            onChangeText={(password) => {
                            setUser({ password });
                        }}
                        ></TextInput>
                        <Spacer/>
                        <TextLink>
                            <TextLinkContent color="blueLight" small>Forget password?</TextLinkContent>
                        </TextLink>
                        <Spacer size="40px"/>
                        <Button size={20}
                            disabled={form?.saving}
                            loading={form?.saving}
                            onPress={() => sendLogin()}>Login
                        </Button>
                        <Spacer size="30px"/>
                        <ExtraView>
                            <ExtraText>Don't have an account already? </ExtraText>
                                <TextLink onPress={() => navigate('Signup')}>
                                    <TextLinkContent medium>Signup</TextLinkContent>
                                </TextLink>                    
                        </ExtraView>    
                    </>
                )}
            </Box>
        </KeyboardAvoidingWrapper>      
    );
};

export default Login;