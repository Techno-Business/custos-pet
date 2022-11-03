import React, { createRef, useEffect, useState, useRef } from "react";
import moment from "moment";
import { Modalize } from "react-native-modalize";
import {
  setEvent as setEventAction,
  saveEvent,
  setForm,
} from "../../store/modules/app/actions";
import MultiSelect from "react-native-multiple-select";
import AddEventSchema from "../../schemas/addEvent.schema";
import { navigate } from "./../../services/navigation";

import { useDispatch, useSelector } from "react-redux";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Agenda, Calendar } from "react-native-calendars";
import {
  Box,
  Spacer,
  TextInput,
  Title,
  DropDownP,
  Button,
} from "./../../components";
export const modalizeRef = createRef();

const Calendario = () => {
  const titleInputRef = useRef();
  const streetInputRef = useRef();
  const numberInputRef = useRef();
  const postalCodeInputRef = useRef();
  const neighbourhoodInputRef = useRef();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { eventForm, form } = useSelector((state) => state.app);
  const setEvent = (payload) => {
    dispatch(setEventAction(payload));
  };
  const [selectedItems, setSelectedItems] = useState([]);
  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };
  const sendEvent = async () => {
    try {
      await AddEventSchema.validate(eventForm);
      dispatch(saveEvent());
    } catch ({ errors }) {
      Alert.alert(errors[0], "Correct the error before continuing");
    }
  };
  const { pet } = useSelector((state) => state.app);
  const items = Array.from(pet).map((e) => ({ id: e.id, name: e.name }));
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [friendNameText, setFriendNameText] = useState("");

  const [showDropDown, setShowDropDown] = useState(false);
  state = {
    markedDates: {},
    isStartDatePicked: false,
    isEndDatePicked: false,
    startDate: "",
  };

  onDayPress = (day) => {
    if (this.state.isStartDatePicked == false) {
      let markedDates = {};
      markedDates[day.dateString] = {
        startingDay: true,
        color: "#00B0BF",
        textColor: "#FFFFFF",
      };
      this.setState({
        markedDates: markedDates,
        isStartDatePicked: true,
        isEndDatePicked: false,
        startDate: day.dateString,
      });
    } else {
      let markedDates = this.state.markedDates;
      let startDate = moment(this.state.startDate);
      let endDate = moment(day.dateString);
      let range = endDate.diff(startDate, "days");
      if (range > 0) {
        for (let i = 1; i <= range; i++) {
          let tempDate = startDate.add(1, "day");
          tempDate = moment(tempDate).format("YYYY-MM-DD");
          if (i < range) {
            markedDates[tempDate] = { color: "#00B0BF", textColor: "#FFFFFF" };
          } else {
            markedDates[tempDate] = {
              endingDay: true,
              color: "#00B0BF",
              textColor: "#FFFFFF",
            };
          }
        }
        this.setState({
          markedDates: markedDates,
          isStartDatePicked: false,
          isEndDatePicked: true,
          startDate: "",
        });
      } else {
        alert("Select an upcomming date!");
      }
    }
  };
  getSelectedDayEvents = (date) => {
    let markedDates = {};
    markedDates[date] = {
      selected: true,
      color: "#00B0BF",
      textColor: "#FFFFFF",
    };
    let serviceDate = moment(date);
    alert(serviceDate);
    serviceDate = serviceDate.format("YYYY.MM.DD");
    this.setState({
      selectedDate: date,
      markedDates: markedDates,
    });
  };

  function onOpen() {
    modalizeRef.current?.open();
  }

  return (
    <View style={{ flex: 1 }}>
      <Button
        width="10%"
        spacing="0 40px 0 0"
        hasPadding="0 0 0 15px"
        icon="home"
        size={30}
        onPress={() => navigate("Home")}
      ></Button>
      <Calendar
        minDate={Date()}
        monthFormat={"MMMM yyyy"}
        markedDates={this.state.markedDates}
        markingType="period"
        hideExtraDays={true}
        hideDayNames={true}
        onDayPress={onOpen}
      />
      <Button title="Abrir modal" onPress={onOpen}></Button>
      <Button
        width="50%"
        background="blueLight"
        size={12}
        onPress={async () => {
          dispatch(setForm({ loading: true }));
          navigate("EventHistory");
        }}
      >
        History
      </Button>
      <Modalize adjustToContentHeight ref={modalizeRef}>
        <Box hasPadding background="primary">
          <Box row align="flex-end" justify="flex-start">
            <Button
              width="15%"
              spacing="0 60px 0 0"
              hasPadding="0 0 0 15px"
              icon="close"
              size={25}
              onPress={() => modalizeRef?.current?.close()}
            ></Button>
            <Title big width="auto">
              Add event
            </Title>
          </Box>
          <Spacer size="20px" />
          <TextInput
            ref={titleInputRef}
            onSubmitEditing={() => {
              titleInputRef.current.focus();
            }}
            label="Título"
            placeholder="Título do evento"
            disabled={form?.loading}
            left={<TextInput.Icon name="calendar" color="#F0560A" />}
            onChangeText={(title) => {
              setEvent({ title });
            }}
          ></TextInput>
          <Spacer />
          <View style={{ width: "100%" }}>
            <MultiSelect
              hideTags
              items={items}
              uniqueKey="id"
              onSelectedItemsChange={(petId) => {
                setEvent({ petId });
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
              displayKey="name"
              searchInputStyle={{ color: "#F0560A" }}
              submitButtonColor="#00BFA5"
              submitButtonText="Submit"
              hideSubmitButton={true}
            />
          </View>
          <Spacer />

          <TextInput
            label="data"
            options={{
              format: "DD/MM/YYYY",
            }}
            placeholder="DD/MM/YYYY"
            left={<TextInput.Icon name="calendar" color="#F0560A" />}
            value={eventForm?.date}
            onChangeText={(date) => {
              setEvent({ date });
            }}
          ></TextInput>
          <Spacer />
          <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={StyleSheet.MainContainer}></View>
          </ScrollView>
          <Box row>
            <TextInput
              label="Rua"
              width="50%"
              spacing="0 4px 0 0"
              placeholder="Pedigree"
              left={<TextInput.Icon name="paw" color="#F0560A" />}
              value={eventForm?.street}
              onChangeText={(street) => {
                setEvent({ street });
              }}
            ></TextInput>
            <TextInput
              label="Número"
              width="50%"
              spacing="0 0 0 4px"
              placeholder="4,2"
              left={<TextInput.Icon name="weight" color="#F0560A" />}
              value={eventForm?.number}
              onChangeText={(number) => {
                setEvent({ number });
              }}
            ></TextInput>
          </Box>
          <Spacer />
          <TextInput
            label="CEP"
            placeholder="CEP"
            left={<TextInput.Icon name="flag-checkered" color="#F0560A" />}
            value={eventForm?.postal_code}
            onChangeText={(postal_code) => {
              setEvent({ postal_code });
            }}
          ></TextInput>
          <Spacer />
          <TextInput
            label="Bairro"
            placeholder="Bairro"
            left={<TextInput.Icon name="flag-checkered" color="#F0560A" />}
            value={eventForm?.neighbourhood}
            onChangeText={(neighbourhood) => {
              setEvent({ neighbourhood });
            }}
          ></TextInput>
          <Spacer size="20px" />
          <Button
            width="60%"
            background="greenLight"
            onPress={() => sendEvent()}
          >
            OK
          </Button>
        </Box>
      </Modalize>
    </View>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: "white",
    margin: 5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#E6E6FA",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  dateText: {
    margin: 16,
  },
  MainContainer: {
    flex: 1,
    paddingTop: 12,
    backgroundColor: "white",
    width: "100%",
  },
});

export default Calendario;
