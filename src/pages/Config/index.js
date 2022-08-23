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

const options = [
  { label: "Inglês", value: "en" },
  { label: "Português", value: "pt" },
];

const Config = () => {
  const { t, i18n } = useTranslation();

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
    <Box>
      <ExtraText width="auto">{t("Choose language")}</ExtraText>
      <SwitchSelector
        options={options}
        textColor={"#1F2937"}
        selectedColor={"#1F2937"}
        buttonColor={"#d59563"}
        borderColor={"#F05603"}
        hasPadding
        initial={0}
        onPress={(value) => changeLanguage(value)}
      />
    </Box>
  );
};

export default Config;
