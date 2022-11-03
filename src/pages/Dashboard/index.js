import React, {useEffect, useState} from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryPie } from "victory-native";
import { getCost } from "../../store/modules/app/actions";
import { getPet } from "../../store/modules/app/actions";
import { AntDesign } from "@expo/vector-icons";
import { navigate } from "./../../services/navigation";

import {
  Box,
  Cover,
  Spacer,
  Title,
  TextP,
  Button,
  ActivityIndicator,
} from "./../../components";


console.log("Ola mundo cruel")
const App = () => {
  const dispatch = useDispatch();
  const { cost, form } = useSelector((state) => state.app);
  const data = [
    { quarter: 1, earnings: 13000, label: "Pet1" },
    { quarter: 2, earnings: 16500, label: "Pet2" },
    { quarter: 3, earnings: 14250, label: "Pet3" },
    { quarter: 4, earnings: 19000, label: "Pet4" }
  ];
  console.log(cost)
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
          {("Dashboard")}
          </Title>
        </Box>
        <View style={styles.container}>
            <VictoryPie 
              data={data} 
              x="quarter"
              y="earnings"
            />
        </View>
      </Box>
  )
}

export default App

// export default class App extends React.Component {
//   render() {
//     return (
//       <Box background="primary" hasPadding>
//         <Spacer size="10px" />
//         <Box row align="flex-end" height="10%">
//           <Button
//             width="15%"
//             spacing="0 40px 0 0"
//             hasPadding="0 0 0 15px"
//             icon="home"
//             size={30}
//             onPress={() => navigate("Home")}
//           ></Button>
//           <Title big width="auto">
//           {" "}
//           {("Dashboard")}
//           </Title>
//         </Box>
//         <View style={styles.container}>
//             <VictoryPie 
//               data={data} 
//               x="quarter"
//               y="earnings"
//             />
//         </View>
//       </Box>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    flex: 1,
    alignItems: "center",
  }
});

