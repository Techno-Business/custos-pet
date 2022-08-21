import React from "react";
import { registerRootComponent } from "expo";

import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

import { Provider as StoreProvider } from "react-redux";
import { ThemeProvider } from "styled-components/native";
import { Provider as PaperProvider } from "react-native-paper";

import Routes from "./src/routes";

import store from "./src/store";

import { colors } from "./src/assets/theme.json";

const App = () => {
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  if (!fontsLoaded) return null;

  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={colors}>
        <PaperProvider>
          <Routes />
        </PaperProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
