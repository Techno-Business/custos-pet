import React, { useRef, useState } from "react";
import { Alert, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import {
  setPet as setPetAction,
  savePet,
} from "./../../store/modules/app/actions";

import {
  Box,
  Spacer,
  Button,
  TextInput,
  Title,
  DropDownP,
} from "./../../components";

import Uploader from "./../../components/uploader";

import KeyboardAvoidingWrapper from "./../../components/Keyboard/KeyboardAvoidingWrapper";

import AddPetSchema from "./../../schemas/addPet.schema";
import { useTranslation } from "react-i18next";
import { navigate } from "../../services/navigation";

const EditPet = (route) => {//27
  const{ id } = route.params;//*
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { petForm, form } = useSelector((state) => state.app);

  const setPet = (payload) => {
    dispatch(setPetAction(payload));
  };

  const sendPet = async () => {
    try {
      await AddPetSchema.validate(petForm);
      dispatch(savePet());
    } catch ({ errors }) {
      Alert.alert(errors[0], i18n.t("Correct the errors before continuing"));
    }
  };

  const [showSexDropDown, setShowSexDropDown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropDown] = useState(false);

  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const categoryInputRef = useRef();

  return (
    <KeyboardAvoidingWrapper>
      <Box hasPadding background="primary" align="center" justify="center">
        <Spacer size="30px" />
        <Box row align="flex-end" justify="flex-start">
          <Button
            width="15%"
            spacing="0 40px 0 0"
            hasPadding="0 0 0 15px"
            icon="home"
            size={30}
            onPress={() => navigate("Home")}
          ></Button>
          <Title big width="auto">
            {" "}
            {t("Register pet")}
          </Title>
        </Box>
        <Spacer size="20px" />
        <Uploader
          title={t("Select a photo")}
          desc={t("This will be your pet's photo")}
          btnDesc={t("Select photo")}
          image={petForm?.photo?.uri}
          callback={(photo) => {
            setPet({ photo });
          }}
        />
        <Spacer size="15px" />
        <Box row align="center" justify="space-between">
          <TextInput
            ref={nameInputRef}
            onSubmitEditing={() => {
              ageInputRef.current.focus();
            }}
            width="50%"
            spacing="0 5px 0 0"
            small
            label={t("Name")}
            placeholder="Orácio"
            left={<TextInput.Icon name="paw" color="#F0560A" />}
            disabled={form?.loading}
            value={petForm?.name}
            onChangeText={(name) => {
              setPet({ name });
            }}
          ></TextInput>
          <View style={{ width: "50%" }}>
            <DropDownP
              label={ i18n.t("Sex")}
              visible={showSexDropDown}
              showDropDown={() => setShowSexDropDown(true)}
              onDismiss={() => setShowSexDropDown(false)}
              inputProps={{
                left: (
                  <TextInput.Icon name="gender-male-female" color="#F0560A" />
                ),
              }}
              value={petForm?.sex || "Male"}
              setValue={(sex) => {
                setPet({ sex });
              }}
              list={[
                { label: i18n.t("Male"), value: "Male" },
                { label: i18n.t("Female"), value: "Female" },
              ]}
              dropDownStyle={{
                marginTop: 40,
              }}
            />
          </View>
        </Box>
        <Spacer />
        <Box row align="center" justify="space-between">
          <TextInput
            ref={ageInputRef}
            onSubmitEditing={() => {
              categoryInputRef.current.focus();
            }}
            width="50%"
            spacing="0 5px 0 0"
            small
            label={t("Age")}
            placeholder={t("2")}
            keyboardType="numeric"
            left={<TextInput.Icon name="calendar" color="#F0560A" />}
            disabled={form?.loading}
            value={petForm?.age}
            onChangeText={(age) => {
              setPet({ age });
            }}
          ></TextInput>
          <View style={{ width: "50%" }}>
            <DropDownP
                label={ i18n.t("Category")}
                visible={showCategoryDropdown}
                showDropDown={() => setShowCategoryDropDown(true)}
                onDismiss={() => setShowCategoryDropDown(false)}
                inputProps={{
                  left: (
                      <TextInput.Icon name="dog" color="#F0560A" />
                  ),
                }}
                value={petForm?.category || "Dog"}
                setValue={(category) => {
                  setPet({ category });
                }}
                list={[
                  { label: i18n.t("Dog"), value: "Dog" },
                  { label: i18n.t("Cat"), value: "Cat" },
                  { label: i18n.t("Fish"), value: "Fish" },
                  { label: i18n.t("Rodent"), value: "Rodent" },
                  { label: i18n.t("Reptile"), value: "Reptile" },
                  { label: i18n.t("Amphibian"), value: "Amphibian" },
                  { label: i18n.t("Other"), value: "Other" },
                ]}
                dropDownStyle={{
                  marginTop: 40,
                }}
            />
          </View>
        </Box>
        <Spacer />
        <Spacer size="30px" />
        <Button
          disabled={form?.saving}
          loading={form?.saving}
          onPress={() => sendPet()}
        >
          
          {" "}
          {t("Edit pet")}
        </Button>
      </Box>
    </KeyboardAvoidingWrapper>
  );
};

export default EditPet;
