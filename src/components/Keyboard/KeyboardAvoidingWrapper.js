import React from 'react';

import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { colors } from './../../assets/theme.json';

const KeyboardAvoidingWrapper = ({children}) => {
    return (
        <KeyboardAvoidingView style={{ flex:1, backgroundColor: colors.primary }}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    )
};

export default KeyboardAvoidingWrapper;