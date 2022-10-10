import React, {
  createRef,
  useState,
  useRef,
  forwardRef,
  useEffect,
  Component,
} from "react";
import { Alert, View, Text, SafeAreaView, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import MultiSelect from "react-native-multiple-select";

import { useDispatch, useSelector } from "react-redux";
import {
  setCost as setCostAction,
  saveCost,
} from "../../store/modules/app/actions";
import { FlatList } from "react-native";

import {
  Box,
  Spacer,
  Button,
  TextInput,
  Title,
  DropDownP,
  TextP,
} from "./../../components";
import SelectBox from "react-native-multi-selectbox";
import TextInputMask from "./../TextInputMask";
import { xorBy } from "lodash";
import AddCostSchema from "../../schemas/addCost.schema";
import { getPet } from "../../store/modules/app/actions";

import { Modalize } from "react-native-modalize";

export const modalRef = createRef();

const ModalAddCost = () => {
  const dispatch = useDispatch();
  const [selectedTeam, setSelectedTeam] = useState({});
  const [selectedTeams, setSelectedTeams] = useState([]);
  const { costForm, form } = useSelector((state) => state.app);
  const { pet } = useSelector((state) => state.app);
  const [selectedItems, setSelectedItems] = useState([]);
  const setCost = (payload) => {
    dispatch(setCostAction(payload));
  };
  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);

    for (let i = 0; i < selectedItems.length; i++) {
      var tempItem = DATA.find((item) => item.id === selectedItems[i]);
      console.log(tempItem);
    }
  };
  useEffect(() => {
    dispatch(getPet());
  }, []);

  const sendCost = async () => {
    try {
      await AddCostSchema.validate(costForm);
      dispatch(saveCost());
    } catch ({ errors }) {
      Alert.alert(errors[0], "Correct the error before continuing");
    }
  };

  const [showDropDown, setShowDropDown] = useState(false);

  //const items = [{ name: "a" }, { name: "b" }, { name: "c" }];
  const [data, setData] = React.useState(pet.pets);

  const DATA = [
    { id: 1, name: "Python" },
    { id: 2, name: "Java" },
    { id: 3, name: "JavaScript" },
    { id: 4, name: "C" },
    { id: 5, name: "PHP" },
    { id: 6, name: "Swift" },
    { id: 7, name: "Ruby" },
    { id: 8, name: "Dart" },
    { id: 9, name: "SQL" },
    { id: 10, name: "Perl" },
  ];

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
            size={25}
            onPress={() => modalRef?.current?.close()}
          ></Button>

          <Title big width="auto">
            {" "}
            {t("Add cost")}
          </Title>
        </Box>
        <Spacer size="20px" />
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
          />

          <SafeAreaView style={{ flex: 1 }}>
            <View style={styleSheet.MainContainer}>
              <Text style={styleSheet.text}>
                {" "}
                React Native Multiple Select{" "}
              </Text>

              <MultiSelect
                hideTags
                items={pet?.pets}
                //items={DATA}
                uniqueKey="name"
                onSelectedItemsChange={onSelectedItemsChange}
                //onSelectedItemsChange={() => }
                selectedItems={selectedItems}
                selectText="Select Items"
                searchInputPlaceholderText="Search Items Here..."
                onChangeInput={(text) => console.log(text)}
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: "#CCC" }}
                submitButtonColor="#00BFA5"
                submitButtonText="Submit"
                // { label: items[1].name, value: "Vaccine" },
                //<View>{this.multiSelect.getSelectedItemsExt(selectedItems)}</View>
              />
            </View>
          </SafeAreaView>
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
          label={t("Goal")}
          placeholder={t("Description")}
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
          medium
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
    padding: 12,
    backgroundColor: "white",
  },

  text: {
    padding: 12,
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
  },
});

export default ModalAddCost;
