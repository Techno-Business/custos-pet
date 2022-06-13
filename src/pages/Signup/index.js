import React, { useState } from 'react';
import { Alert } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { setUser as setUserAction, saveUser } from './../../store/modules/app/actions';

import { Box, Spacer, Title, Button, TextInput, ExtraView, ExtraText, TextLink, TextLinkContent } 
from '../../components';

import SignupSchema from './../../schemas/signup.schema';

import KeyboardAvoidingWrapper from '../../components/Keyboard/KeyboardAvoidingWrapper';

import { navigate } from './../../services/navigation';

const Signup = () => {
    const [hidePassword, setHidePassword] = useState(true);
    
    const dispatch = useDispatch();
    const { userForm, form } = useSelector((state) => state.app);

    const setUser = (payload) => {
        dispatch(setUserAction(payload));
    };

    const requestSignup = async () => {
        try {
            await SignupSchema.validate(userForm);
            dispatch(saveUser());
        } catch ({ errors }) {
            Alert.alert(errors[0], 'correct the error before continuing');
        }
    };

    return (
        <KeyboardAvoidingWrapper>
            <Box background="primary" hasPadding>
                <Spacer size="90px"/>
                <Title medium>Account Signup</Title>
                <Spacer size="30px"/>
                <TextInput 
                    label="Firstname" 
                    placeholder="Brayan" 
                    left={<TextInput.Icon name="account" color="#F0560A"/>}
                    disabled={form?.saving}
                    value={userForm?.firstName}
                    onChangeText={(firstName) => {
                        setUser({ firstName });
                    }}
                ></TextInput>
                <Spacer size="15px"/>
                <TextInput 
                    label="Lastname" 
                    placeholder="Uehara" 
                    left={<TextInput.Icon name="account" color="#F0560A"/>}
                    disabled={form?.saving}
                    value={userForm?.lastName}
                    onChangeText={(lastName) => {
                        setUser({ lastName });
                    }}
                ></TextInput>
                <Spacer size="15px"/>
                <TextInput 
                    label="Email" 
                    placeholder="example@gmail.com" 
                    left={<TextInput.Icon name="email" color="#F0560A"/>}
                    keyboardType="email-address"
                    disabled={form?.saving}
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
                    disabled={form?.saving}
                    value={userForm?.password}
                    onChangeText={(password) => {
                        setUser({ password });
                    }}
                ></TextInput>
                <Spacer size="15px"/>
                <TextInput 
                    label="Confirm Password" 
                    placeholder="* * * * * * * * *" 
                    secureTextEntry={hidePassword}
                    left={<TextInput.Icon name="lock" color="#F0560A"/>}
                    right={<TextInput.Icon name={hidePassword ? "eye-off" : 'eye'} color="#9CA3AF" onPress={() => setHidePassword(!hidePassword)}/>} 
                    disabled={form?.saving}
                    value={userForm?.passwordConfirm}
                    onChangeText={(passwordConfirm) => {
                        setUser({ passwordConfirm });
                    }}
                ></TextInput>    
                <Spacer size="40px"/>
                <Button size={20}
                    disabled={form?.saving}
                    loading={form?.saving}
                    onPress={() => requestSignup()}>Signup
                </Button>
                <Spacer size="30px"/>
                <ExtraView>
                    <ExtraText>Already have an account? </ExtraText>
                        <TextLink onPress={() => navigate('Login')}>
                            <TextLinkContent medium>Login</TextLinkContent>
                        </TextLink>                    
                </ExtraView>
            </Box>
        </KeyboardAvoidingWrapper>      
    );
};

export default Signup;