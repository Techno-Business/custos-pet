import React, { createRef, useState, useRef, useEffect } from "react";
import { Alert, View, StyleSheet, ScrollView } from "react-native";
import TextInputMask from "./../TextInputMask";
import { Modalize } from "react-native-modalize";
import MultiSelect from "react-native-multiple-select";
import { useDispatch, useSelector } from "react-redux";
import {
  setCost as setCostAction,
  saveCost,
} from "../../store/modules/app/actions";

import {
  Box,
  Spacer,
  Button,
  TextInput,
  Title,
  DropDownP,
} from "./../../components";

import AddCostSchema from "../../schemas/addCost.schema";
import { useTranslation } from "react-i18next";

export const modalRef = createRef();

const ModalAddCost = () => {
  const dispatch = useDispatch();

  const { costForm, form } = useSelector((state) => state.app);
  const setCost = (payload) => {
    dispatch(setCostAction(payload));
  };

  const [selectedItems, setSelectedItems] = useState([]);
  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };

  const sendCost = async () => {
    try {
      await AddCostSchema.validate(costForm);
      dispatch(saveCost());
    } catch ({ errors }) {
      Alert.alert(errors[0], "Correct the error before continuing");
    }
  };

  const [showDropDown, setShowDropDown] = useState(false);

  const { pet } = useSelector((state) => state.app);

  const items = Array.from(pet).map((e) => ({ id: e.id, name: e.name }));

  const brandInputRef = useRef();
  const weightInputRef = useRef();
  const goalInputRef = useRef();
  const { t, i18n } = useTranslation();
  return (
    <Modalize adjustToContentHeight ref={modalRef}>
      <Box hasPadding background="primary">
        <Box row align="flex-end" justify="flex-start">
          <Button
            width="15%"
            spacing="0 60px 0 0"
            hasPadding="0 0 0 15px"
            icon="close"
            size={15}
            onPress={() => modalRef?.current?.close()}
          ></Button>

          <Title big width="auto">
            {" "}
            {t("Add cost")}
          </Title>
        </Box>
        <Spacer size="10px" />
        <View style={{ width: "100%" }}>
          <DropDownP
            label={t("Type")}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            inputProps={{
              left: <TextInput.Icon name="dog-service" color="#F0560A" />,
            }}
            value={costForm?.type || "Service"}
            setValue={(type) => {
              setCost({ type });
            }}
            list={[
              { label: i18n.t("Service"), value: "Service" },
              { label: i18n.t("Vaccine"), value: "Vaccine" },
              { label: i18n.t("Feed"), value: "Feed" },
            ]}
            dropDownStyle={{
              marginTop: 40,
            }}
          />

          <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styleSheet.MainContainer}>
              <MultiSelect
                hideTags
                items={items}
                uniqueKey="id"
                onSelectedItemsChange={(petId) => {
                  setCost({ petId });
                  onSelectedItemsChange(petId);
                }}
                selectedItems={selectedItems}
                selectText="Select pets"
                searchInputPlaceholderText="Search pets here..."
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#F0560A"
                selectedItemIconColor="#F0560A"
                itemTextColor="#000"
                itemFontSize={15}
                displayKey="name"
                searchInputStyle={{ color: "#F0560A" }}
                submitButtonColor="#00BFA5"
                submitButtonText="Submit"
                hideSubmitButton={true}
              />
            </View>
          </ScrollView>
        </View>

        <Spacer />
        <TextInputMask
          onSubmitEditing={() => {
            if (costForm?.type != "Feed") goalInputRef.current.focus();
            else brandInputRef.current.focus();
          }}
          label={t("Date")}
          type={"datetime"}
          options={{
            format: "DD/MM/YYYY",
          }}
          placeholder="DD/MM/YYYY"
          left={<TextInput.Icon name="calendar" color="#F0560A" />}
          disabled={form?.loading}
          value={costForm?.date}
          onChangeText={(date) => {
            setCost({ date });
          }}
        ></TextInputMask>
        <Spacer />
        <Box row>
          <TextInput
            ref={brandInputRef}
            onSubmitEditing={() => {
              weightInputRef.current.focus();
            }}
            label={t("Brand")}
            width="50%"
            spacing="0 4px 0 0"
            placeholder="Pedigree"
            left={<TextInput.Icon name="paw" color="#F0560A" />}
            disabled={form?.loading || costForm?.type != "Feed"}
            value={costForm?.type != "Feed" ? "" : costForm?.brand}
            onChangeText={(brand) => {
              setCost({ brand });
            }}
          ></TextInput>
          <TextInput
            ref={weightInputRef}
            onSubmitEditing={() => {
              goalInputRef.current.focus();
            }}
            label={t("Weight")}
            width="50%"
            spacing="0 0 0 4px"
            placeholder="4,2"
            keyboardType="numeric"
            left={<TextInput.Icon name="weight" color="#F0560A" />}
            right={<TextInput.Affix text="Kg" />}
            disabled={form?.loading || costForm?.type != "Feed"}
            value={costForm?.type != "Feed" ? "" : costForm?.weight}
            onChangeText={(weight) => {
              setCost({ weight });
            }}
          ></TextInput>
        </Box>
        <Spacer />
        <TextInput
          ref={goalInputRef}
          label={t("Description")}
          placeholder={t("Feed to Bidu")}
          left={<TextInput.Icon name="flag-checkered" color="#F0560A" />}
          disabled={form?.loading}
          value={costForm?.goal}
          onChangeText={(goal) => {
            setCost({ goal });
          }}
        ></TextInput>
        <Spacer />
        <TextInputMask
          label={t("Price")}
          type={"money"}
          options={{
            precision: 2,
            separator: ",",
            delimiter: ".",
            unit: "R$",
            suffixUnit: "",
          }}
          small
          placeholder="60,00"
          left={<TextInput.Icon name="cash" color="#F0560A" />}
          disabled={form?.loading}
          value={costForm?.price}
          onChangeText={(price) => {
            setCost({ price });
          }}
        ></TextInputMask>
        <Spacer size="20px" />
        <Button
          width="60%"
          background="greenLight"
          disabled={form?.saving}
          loading={form?.saving}
          onPress={() => sendCost()}
        >
          {" "}
          {t("Add cost")}
        </Button>
      </Box>
    </Modalize>
  );
};

const styleSheet = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 12,
    backgroundColor: "white",
    width: "100%",
  },
});

export default ModalAddCost;
