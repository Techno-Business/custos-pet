import React, { createRef, useEffect } from "react";

import { FlatList } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { getEvent, getCost } from "../../store/modules/app/actions";

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
import { useTranslation } from "react-i18next";
const EventHistory = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { event, form } = useSelector((state) => state.app);

  const items = Array.from(event).map((e) => ({ id: e.id, title: e.title }));
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
          Event History
        </Title>
      </Box>

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
                <TextP align="left" medium>{`${item.title}  `}</TextP>
              </Box>
            )}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default EventHistory;
