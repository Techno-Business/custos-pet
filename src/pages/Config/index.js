import React, { useState, useEffect, useRef } from "react";
import "../../utils/i18n";

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
    <Box background="primary" hasPadding aling="center" justify="center">
      <ExtraView>
        <ExtraText width="auto">{t("Change language")}</ExtraText>
      </ExtraView>
      <Spacer size="40px" />
      <Button onPress={() => changeLanguage("pt")}>Português</Button>
      <Spacer size="40px" />
      <Button onPress={() => changeLanguage("en")}>Inglês</Button>
    </Box>
  );
};

export default Config;
