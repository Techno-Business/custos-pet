import React, { useState, useEffect, useRef } from "react";
import "../../utils/i18n";

import {
  Button,
  View,
  StyleSheet,
  FlatList,
  Text,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";

const DATA = [
  { id: 1, text: "Nome" },
  { id: 2, text: "Senha" },
  { id: 3, text: "Notificações" },
  { id: 4, text: "Idioma" },
  { id: 5, text: "Sair" },
];

import SwitchSelector from "react-native-switch-selector";

import { useTranslation } from "react-i18next";
import { navigate } from "./../../services/navigation";

import {
  Box,
  Cover,
  Spacer,
  Title,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  ActivityIndicator,
  Button as ButtonB,
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
    i18n.changeLanguage(value);
  };
  const [data, setData] = useState(DATA);
  const [isRender, setisRender] = useState(false);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [inputText, setInputText] = useState();

  const onPressItem = (item) => {
    setisModalVisible(true);
  };

  const renderItem = ({ item, index }) => {
    if (index == 0) {
    }
    return (
      <TouchableOpacity style={styles.item} onPress={() => onPressItem(item)}>
        <Text style={styles.text}>{item.text}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          extraData={isRender}
        />

        {DATA[0] == "nome" && (
          <Modal
            animationType="fade"
            visible={isModalVisible}
            onRequestClose={() => setisModalVisible(false)}
          >
            <View style={styles.modalView}>
              <Text style={styles.text}>Change:</Text>
            </View>
          </Modal>
        )}
        <Modal
          animationType="fade"
          visible={isModalVisible}
          onRequestClose={() => setisModalVisible(false)}
        >
          <View style={styles.modalView}>
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
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    background: "primary",
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    alignItems: "flex-start",
  },
  text: {
    marginVertical: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
  },
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    margin: 40,
  },
  touchableSave: {
    backgroundColor: "orange",
    paddingHorizontal: 100,
    alignItems: "center",
    marginTop: 20,
  },
});

export default Config;
