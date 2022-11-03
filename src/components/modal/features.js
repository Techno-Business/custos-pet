import { Spacer, Button } from "..";
import { Modal, TouchableOpacity, StyleSheet, View } from "react-native";
import { navigate } from "./../../services/navigation";
import { t } from "i18next";
import { useState } from "react";

const ModalFeatures = ({ navigation: { goBack } }) => {
  const [visibleModal, setVisibleModal] = useState(true);

  return (
    <>
      <Spacer size="20px" />
      <Modal
        visible={visibleModal}
        transparent={true}
        onRequestClose={() => goBack()}
      >
        <TouchableOpacity
          style={{ flex: 1, zIndex: 9 }}
          onPress={() => {
            goBack();
          }}
        ></TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.content}>
            <Button 
              onPress={() => {
                setVisibleModal(false);
                navigate("Dashboard");
              }}
            >
              {t("Dashboard")}</Button>
            <Spacer />
            <Button onPress={() => navigate("AddPet")}>{t("Calendar")}</Button>
            <Spacer />
            <Button
              onPress={() => {
                setVisibleModal(false);
                navigate("MapsScreen");
              }}
            >
              {t("Localization")}
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  content: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderColor: "#F0560A",
    borderStyle: "solid",
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    justifyContent: "center",
  },
});

export default ModalFeatures;
