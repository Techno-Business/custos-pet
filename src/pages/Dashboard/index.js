import React, {useEffect, useState} from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { VictoryTooltip, VictoryPie } from "victory-native";
import { getOwnerCost } from "../../store/modules/app/actions";
import { AntDesign } from "@expo/vector-icons";
import { navigate } from "./../../services/navigation";
import illustration from "./../../assets/illustration.jpg";

import {
  Box,
  Colors,
  Color,
  Cover,
  Spacer,
  Title,
  TextP,
  Button,
  ActivityIndicator,
} from "./../../components";


const App = () => {
  const dispatch = useDispatch();

  const { ownerCost, form } = useSelector((state) => state.app);
  const [data, setData] = useState([])


  useEffect(() => {
    dispatch(getOwnerCost());
  }, []);
  useEffect(() => {
    if(Array.isArray(ownerCost)){
      const mappedOwnerCost = ownerCost.map((e) => ({ id_pet: e.pet_id, total_price_pet: e.total_price, label: `${e.pet_name}\nR$${e.total_price/100}`}));
      setData([...mappedOwnerCost])
    }
  }, [ownerCost]); 

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
          {("Dashboard")}
          </Title>
        </Box>
        {/* {data && (<Title big color="tertiary" small>
            {("No pet registered at the moment")}
          </Title>)} */}
        {data.length ? (
          <View style={styles.container}>
            <VictoryPie
              responsive={true}
              data={data}
              x="id_pet"
              y="total_price_pet"
              colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
              innerRadius={80}
              style={{
                labels:{
                  padding: -30,
                  fontSize: 15
                }
              }}
            />
          </View>
        ):(
          <Box hasPadding align="center" justify="center">
            <Cover
              source={illustration}
              width="300px"
              height="160px"
              transparent
            />
            <Spacer size="40px" />
            <Title big color="tertiary" small>
              {("Nenhum gasto registrado até o momento!")}
            </Title>
          </Box>
        )}
        
      </Box>
  )
}


export default App

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
  }
});

