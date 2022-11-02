import React, { useEffect, useState, useRef } from "react";

import moment from "moment"; // 2.20.1
import { View } from "react-native"; // 0.0.1
import { Calendar } from "react-native-calendars"; // 1.16.1
import { Modalize } from "react-native-modalize";
import {
  Box,
  Spacer,
  TextInput,
  Title,
  DropDownP,
  Button,
} from "./../../components";
const _format = "YYYY-MM-DD";
const _today = moment().format(_format);
const _maxDate = moment().add(15, "days").format(_format);

class WixCalendar extends React.Component {
  // It is not possible to select some to current day.
  initialState = {
    [_today]: { disabled: true },
  };

  constructor() {
    super();

    this.state = {
      _markedDates: this.initialState,
    };
  }

  onDaySelect = (day) => {
    const _selectedDay = moment(day.dateString).format(_format);

    let marked = true;
    if (this.state._markedDates[_selectedDay]) {
      // Already in marked dates, so reverse current marked state
      marked = !this.state._markedDates[_selectedDay].marked;
    }

    // Create a new object using object property spread since it should be immutable
    // Reading: https://davidwalsh.name/merge-objects
    const updatedMarkedDates = {
      ...this.state._markedDates,
      ...{ [_selectedDay]: { marked } },
    };

    // Triggers component to render again, picking up the new state
    this.setState({ _markedDates: updatedMarkedDates });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Calendar
          minDate={_today}
          maxDate={_maxDate}
          // hideArrows={true}

          onDayPress={this.onDaySelect}
          markedDates={this.state._markedDates}
        />
      </View>
    );
  }
}

export default WixCalendar;
