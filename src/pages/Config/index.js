import React, { useState, useEffect, useRef } from "react";
import "../../utils/i18n";

import SwitchSelector from "react-native-switch-selector";

import { useTranslation } from "react-i18next";

import {
  Box,
  Cover,
  Spacer,
  Title,
  Button,
  TextInput,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  ActivityIndicator,
} from "../../components";
import { Switch } from "react-native-gesture-handler";
import i18n from "../../utils/i18n";

const Config = () => {
  const { t, i18n } = useTranslation();

  const options = [
    { label: i18n.t("English"), value: "en" },
    { label: i18n.t("Portuguese"), value: "pt" },
  ];
  const changeLanguage = (value) => {
    i18n
      .changeLanguage(value)
      .then(() => {
        console.log("linguagem alterada");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box background="primary" hasPadding aling="center" justify="center">
      <ExtraText width="auto">{t("Choose language")}</ExtraText>
      <SwitchSelector
        options={options}
        textColor={"#1F2937"}
        selectedColor={"#1F2937"}
        buttonColor={"#d59563"}
        borderColor={"#F05603"}
        hasPadding
        initial={1}
        onPress={(value) => changeLanguage(value)}
      />
    </Box>
  );
};

export default Config;
