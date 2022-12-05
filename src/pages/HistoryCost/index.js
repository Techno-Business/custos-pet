import React, { useEffect } from "react";

import { 
  FlatList, 
  StyleSheet,//
  Text,//
  View,//
  Alert,//
} from "react-native";

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

import AsyncStorage from '@react-native-async-storage/async-storage';//
import { Feather as Icon } from '@expo/vector-icons';//

import { navigate } from "./../../services/navigation";
import { useTranslation } from "react-i18next";
const HistoryCost = () => {
  const { i18n } = useTranslation();
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
          {i18n.t("History cost")}
        </Title>
      </Box>
      {form?.loading && (
        <>
          <Spacer size="90px" />
          <ActivityIndicator color="brand" size="large" />
        </>
      )}

      {!cost?.costsDto && !form?.loading && (
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
            {i18n.t("No cost registered at the moment")}
          </Title>
        </Box>
      )}

      {cost?.costsDto && !form?.loading && (
        <Box hasPadding>
          <Box row>
            <FlatList
              data={cost?.costsDto}
              keyExtractor={(item) => item?.id}
              renderItem={({ item, index }) => (
                <Box
                  hasPadding
                  background={util.toAlpha(colors.darkLight, 10)}
                  radius
                  spacing="0 0 10px 0"
                >
                  {<Button style={{height: 30, width:0, alignSelf: 'flex-end'}}
                    spacing="0 0 0 0"
                    background="blueLight"
                    hasPadding="0 0 0 0"
                    onPress={async () => { 
                      modalRefCost?.current?.open();
                    }} >
                    <Icon name="edit" size={12.5} />  
                  </Button>}
                  {<Button style={{height: 30, width:0, alignSelf: 'flex-end'}}
                    spacing="0 0 0 0"
                    background="redLight"
                    hasPadding="0 0 0 0"
                    onPress={async () => {
                      costDeletePress();
                    }}>
                  <Icon name="trash" size={12.5} /> 
                </Button>}
                  <TextP
                    align="left"
                    medium
                  >{`${i18n.t(item.type)} - ${item.goal} `}</TextP>
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
              {i18n.t("COST TOTAL:")}
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

function costDeletePress(){
  Alert.alert(
      "Atenção",
      "Você tem certeza que deseja excluir este custo?",
      [
          {
          text: "Não",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
          },
          { text: "Sim", onPress: () => { /*console.log(`${props.id} deleted`)*/
              deleteCost(props.id)
              .then(response => props.navigation.navigate("HistoryCost", {id: props.id}));
         }
        }
      ],
      { cancelable: false }
      );
}

async function deleteCost(id){
  let saveCost = await getCost();
  const index = await saveCost.findIndex(cost => cost.id === id);
  saveCost.splice(index, 1);
  return AsyncStorage.setCost('cost', JSON.stringify(saveCost));
}

export default HistoryCost;
