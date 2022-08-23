import React, { createRef, useEffect } from "react";

import { FlatList } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { getCost } from "../../store/modules/app/actions";

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
const HistoryCost = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { cost, form } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(getCost());
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
          {" "}
          {t("History cost")}
        </Title>
      </Box>
      {form?.loading && (
        <>
          <Spacer size="90px" />
          <ActivityIndicator color="brand" size="large" />
        </>
      )}

      {!cost?.costs && !form?.loading && (
        <Box hasPadding justify="center" align="center">
          <Cover
            source={illustration}
            width="220px"
            height="160px"
            transparent
          />
          <Spacer size="40px" />
          <Title big color="tertiary" small>
            {" "}
            {t("No cost registered at the moment")}
          </Title>
        </Box>
      )}

      {cost?.costs && !form?.loading && (
        <Box hasPadding>
          <Box row>
            <FlatList
              data={cost?.costs}
              keyExtractor={(item) => item?._id}
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
                  >{`${item.type} - ${item.goal} `}</TextP>
                  <TextP align="left" bold>
                    {moment(item.date).format("MMM Do YY")}
                  </TextP>
                  <TextP align="right" color="greenLight" big bold>{`R$ ${(
                    item.price / 100
                  )
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`}</TextP>
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
              COST TOTAL:
            </TextP>
            <TextP align="right" color="greenLight" big bold>
              {`R$ ${(cost?.costTotal / 100)
                .toFixed(2)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`}
            </TextP>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default HistoryCost;
