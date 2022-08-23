import React, { useState, useRef } from "react";
import { Alert } from "react-native";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser as setUserAction,
  saveUser,
} from "./../../store/modules/app/actions";

import {
  Box,
  Spacer,
  Title,
  Button,
  TextInput,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from "../../components";

import SignupSchema from "./../../schemas/signup.schema";

import KeyboardAvoidingWrapper from "../../components/Keyboard/KeyboardAvoidingWrapper";

import { navigate } from "./../../services/navigation";

const Signup = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const { t, i18n } = useTranslation();
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
      Alert.alert(errors[0], "Correct the error before continuing");
    }
  };

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmInputRef = useRef();

  return (
    <KeyboardAvoidingWrapper>
      <Box background="primary" hasPadding aling="center" justify="center">
        <Spacer size="60px" />
        <Title medium>{t("Account Signup")}</Title>
        <Spacer size="30px" />
        <TextInput
          ref={firstNameInputRef}
          onSubmitEditing={() => {
            lastNameInputRef.current.focus();
          }}
          label="Firstname"
          placeholder="Brayan"
          left={<TextInput.Icon name="account" color="#F0560A" />}
          disabled={form?.saving}
          value={userForm?.firstName}
          onChangeText={(firstName) => {
            setUser({ firstName });
          }}
        ></TextInput>
        <Spacer size="15px" />
        <TextInput
          ref={lastNameInputRef}
          onSubmitEditing={() => {
            emailInputRef.current.focus();
          }}
          label="Lastname"
          placeholder="Uehara"
          left={<TextInput.Icon name="account" color="#F0560A" />}
          disabled={form?.saving}
          value={userForm?.lastName}
          onChangeText={(lastName) => {
            setUser({ lastName });
          }}
        ></TextInput>
        <Spacer size="15px" />
        <TextInput
          ref={emailInputRef}
          onSubmitEditing={() => {
            passwordInputRef.current.focus();
          }}
          label="Email"
          placeholder="example@gmail.com"
          left={<TextInput.Icon name="email" color="#F0560A" />}
          keyboardType="email-address"
          disabled={form?.saving}
          value={userForm?.email}
          onChangeText={(email) => {
            setUser({ email });
          }}
        ></TextInput>
        <Spacer size="15px" />
        <TextInput
          ref={passwordInputRef}
          onSubmitEditing={() => {
            passwordConfirmInputRef.current.focus();
          }}
          label="Password"
          placeholder="* * * * * * * * *"
          secureTextEntry={hidePassword}
          left={<TextInput.Icon name="lock" color="#F0560A" />}
          right={
            <TextInput.Icon
              name={hidePassword ? "eye-off" : "eye"}
              color="#9CA3AF"
              onPress={() => setHidePassword(!hidePassword)}
            />
          }
          disabled={form?.saving}
          value={userForm?.password}
          onChangeText={(password) => {
            setUser({ password });
          }}
        ></TextInput>
        <Spacer size="15px" />
        <TextInput
          ref={passwordConfirmInputRef}
          label="Confirm Password"
          placeholder="* * * * * * * * *"
          secureTextEntry={hidePassword}
          left={<TextInput.Icon name="lock" color="#F0560A" />}
          right={
            <TextInput.Icon
              name={hidePassword ? "eye-off" : "eye"}
              color="#9CA3AF"
              onPress={() => setHidePassword(!hidePassword)}
            />
          }
          disabled={form?.saving}
          value={userForm?.passwordConfirm}
          onChangeText={(passwordConfirm) => {
            setUser({ passwordConfirm });
          }}
        ></TextInput>
        <Spacer size="40px" />
        <Button
          disabled={form?.saving}
          loading={form?.saving}
          onPress={() => requestSignup()}
        >
          {t("Signup")}
        </Button>
        <Spacer size="30px" />
        <ExtraView>
          <ExtraText width="auto"> {t("Already have an account?")} </ExtraText>
          <TextLink width="auto" onPress={() => navigate("Login")}>
            <TextLinkContent hasPadding medium>
              {t("Login")}
            </TextLinkContent>
          </TextLink>
        </ExtraView>
      </Box>
    </KeyboardAvoidingWrapper>
  );
};

export default Signup;
