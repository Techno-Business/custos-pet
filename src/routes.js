import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { StatusBar } from "react-native";
import { colors } from "./assets/theme.json";

import { navigationRef } from "./services/navigation";

import LoginScreen from "./pages/Login";
import SignupScreen from "./pages/Signup";
import HomeScreen from "./pages/Home";
import AddPetScreen from "./pages/AddPet";
import HistoryCost from "./pages/HistoryCost";
import MapsScreen from "./pages/Maps";
import ConfigScreen from "./pages/Config";
import { useTranslation } from "react-i18next";
import EventHistory from "./pages/Calendar/eventHistory";
import ModalFeatures from "./components/modal/features";
import AddPet from "./pages/AddPet";
import Dashboard from "./pages/Dashboard";
import CalendarScreen from "./pages/Calendar";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const TabNavigator = () => {
  const { t, i18n } = useTranslation();
  const logout = i18n.t("Logout");

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
        tabBarStyle: {
          backgroundColor: colors.tertiary,
          height: 70,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarInactiveTintColor: colors.primary,
        tabBarActiveTintColor: colors.brand,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="featureScreen"
        component={ModalFeatures}
        options={{
          tabBarLabel: i18n.t("Features"),
          tabBarIcon: ({ color, size }) => (
            <Icon name="google-maps" color={color} size={30} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("ModalFeatures");
          },
        })}
      />
      <Tab.Screen
        name="ConfigScreen"
        component={ConfigScreen}
        options={{
          tabBarLabel: "Config",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Logout"
        component={LoginScreen}
        options={({ route }) => ({
          tabBarLabel: i18n.t("Logout"),
          tabBarStyle: {
            display: getTabBarVisibility(route.name),
          },
          tabBarIcon: ({ color, size }) => (
            <Icon name="logout" color={color} size={30} />
          ),
        })}
        listeners={{
          tabPress: (e) => {
            AsyncStorage.clear();
          },
        }}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisibility = (route) => {
  if (route == "Logout") return "none";

  return "flex";
};

const Routes = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.brand} />
      <NavigationContainer
        options={{ animationEnabled: true }}
        ref={navigationRef}
      >
        <Stack.Navigator
          options={{ animationEnabled: true }}
          initialRouteName="Login"
        >
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={TabNavigator}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Signup"
            component={SignupScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="EventHistory"
            component={EventHistory}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="CalendarScreen"
            component={CalendarScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="AddPet"
            component={AddPetScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="HistoryCost"
            component={HistoryCost}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="MapsScreen"
            component={MapsScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Dashboard"
            component={Dashboard}
          />
          <Stack.Screen
            options={{
              presentation: "transparentModal",
              headerShown: false,
              cardOverlayEnabled: true,
            }}
            name="ModalFeatures"
            component={ModalFeatures}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Routes;
