import React, { createRef, useEffect } from "react";

import { FlatList } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { getEvent } from "../../store/modules/app/actions";

import {
  Box,
  Cover,
  Spacer,
  Title,
  TextP,
  Button,
  ActivityIndicator,
} from "./../../components";

import util from "../../util";
import moment from "moment";
import { colors } from "./../../assets/theme.json";

import illustration from "./../../assets/illustrationHistory.png";

import { navigate } from "./../../services/navigation";
const EventHistory = () => {
  const dispatch = useDispatch();
  const { event, form } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(getEvent());
  }, []);

  return (
    <Box background="primary" hasPadding>
      <Spacer size="10px" />
      <Box row align="flex-end" height="10%">
        <Button
          width="15%"
          spacing="0 40px 0 0"
          hasPadding="0 0 0 15px"
          icon="home"
          size={30}
          onPress={() => navigate("Home")}
        ></Button>
        <Title big width="auto">
          History event
        </Title>
      </Box>
      {form?.loading && (
        <>
          <Spacer size="90px" />
          <ActivityIndicator color="brand" size="large" />
        </>
      )}

      {!event?.diariesDto && !form?.loading && (
        <Box hasPadding justify="center" align="center">
          <Cover
            source={illustration}
            width="220px"
            height="160px"
            transparent
          />
          <Spacer size="40px" />
          <Title big color="tertiary" small>
            No event registered at the moment
          </Title>
        </Box>
      )}

      {event?.diariesDto && !form?.loading && (
        <Box hasPadding>
          <Box row>
            <FlatList
              data={event?.diariesDto}
              keyExtractor={(item) => item?.id}
              renderItem={({ item, index }) => (
                <Box
                  hasPadding
                  background={util.toAlpha(colors.darkLight, 10)}
                  radius
                  spacing="0 0 10px 0"
                >
                  <TextP
                    align="left"
                    medium
                  >{`${item.title} - ${item.street} `}</TextP>
                  <TextP align="left" bold>
                    {moment(item.date).format("MMM Do YY")}
                  </TextP>
                </Box>
              )}
            />
          </Box>
          <Box
            hasPadding
            background={util.toAlpha(colors.darkLight, 10)}
            radius
            spacing="0 0 10px 0"
            height="100px"
          >
            <TextP align="left" medium bold>
              events
            </TextP>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default EventHistory;
