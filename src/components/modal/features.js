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
      <Modal visible={visibleModal} transparent={true}>
        <TouchableOpacity
          style={{ flex: 1, zIndex: 9 }}
          onPress={() => {
            goBack();
          }}
        ></TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.content}>
            <Button>{t("Dashboard")}</Button>
            <Spacer />
            <Button onPress={() => navigate("AddPet")}>
              {t("Localization")}
            </Button>
            <Spacer />
            <Button
              onPress={() => {
                setVisibleModal(false);
                navigate("MapsScreen");
              }}
            >
              {t("Calendar")}
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
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
  },
});

export default ModalFeatures;
