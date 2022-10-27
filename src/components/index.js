import styled from "styled-components/native";
import Constants from "expo-constants";

import {
  Title as TitlePaper,
  Text as TextPaper,
  Button as ButtonPaper,
  TextInput as TextInputPaper,
  ActivityIndicator as ActivityIndicatorPaper,
} from "react-native-paper";

import DropDown from "react-native-paper-dropdown";

export const Box = styled.View`
  flex: 1;
  flex-wrap: ${(props) => props.wrap || "nowrap"};
  flex-direction: ${(props) => (props.row ? "row" : "column")};
  justify-content: ${(props) => props.justify || "flex-start"};
  align-items: ${(props) => props.align || "flex-start"};
  width: ${(props) => props.width || "100%"};
  max-width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "auto"};
  max-height: ${(props) => props.height || "auto"};
  padding: ${(props) => (props.hasPadding ? "20px" : "0px")};
  padding-top: ${(props) =>
    props.removePaddingTop ? "0" : props.hasPadding ? "20px" : "0px"};
  padding-bottom: ${(props) =>
    props.removePaddingBottom ? "0" : props.hasPadding ? "20px" : "0px"};
  margin: ${(props) => props.spacing || 0};
  border-radius: ${(props) => (props.radius ? "10px" : "0px")};
  border: ${(props) => props.border || "none"};
  background: ${(props) =>
    props.theme[props.background] || props.background || "transparent"};
`;

export const Cover = styled.ImageBackground.attrs((props) =>
  props.image
    ? {
        source: { uri: props.image },
      }
    : undefined
)`
  width: ${(props) => props.width || "100px"};
  height: ${(props) => props.height || "100px"};
  margin: ${(props) => props.spacing || "0 auto"};
  border-radius: ${(props) => (props.circle ? props.width : "10px")};
  border: ${(props) => props.border || "none"};
  overflow: hidden;
  background-color: ${({ theme, transparent }) =>
    transparent ? "transparent" : theme.darkLight};
`;

export const Spacer = styled.View`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.size || "10px"};
`;

export const ActivityIndicator = styled(ActivityIndicatorPaper).attrs(
  (props) => ({
    animating: true,
    color: props.theme[props.color],
  })
)`
  width: ${(props) => props.width || "100%"};
  margin: ${(props) => props.spacing || "0 auto"};
`;

export const Title = styled(TitlePaper)`
  width: ${(props) => props.width || "100%"};
  color: ${(props) => props.theme[props.color || "tertiary"]};
  font-size: ${(props) =>
    props.big ? "20px" : props.medium ? "20px" : "20px"};
  line-height: ${(props) =>
    props.big ? "32px" : props.medium ? "24px" : "18px"};
  padding: ${(props) => (props.hasPadding ? "20px" : "0px")};
  letter-spacing: 1px;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  text-align: ${(props) => props.align || "center"};
  transform: ${(props) => (props.scale ? `scale(${props.scale})` : "")};
  font-family: "Inter_700Bold";
`;

export const TextP = styled(TextPaper)`
  width: ${(props) => props.width || "100%"};
  color: ${(props) => props.theme[props.color || "tertiary"]};
  font-size: ${(props) =>
    props.big ? "20px" : props.medium ? "16px" : props.small ? "13px" : "20px"};
  font-family: ${(props) =>
    props.bold ? "Inter_700Bold" : "Inter_400Regular"};
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  transform: ${(props) => (props.scale ? `scale(${props.scale})` : "")};
  margin: ${(props) => props.spacing || 0};
  padding: ${(props) => (props.hasPadding ? "20px" : "0px")};
  opacity: ${(props) => props.opacity || 1};
  text-align: ${(props) => props.align || "left"};
`;

export const TextInput = styled(TextInputPaper).attrs(({ theme }) => ({
  mode: "",
  theme: {
    colors: {
      background: theme.primary,
      placeholder: theme.darkLight,
      primary: theme.tertiary,
      text: theme.tertiary,
    },
  },
}))`
  height: ${(props) => props.height || "60px"};
  width: ${(props) => props.width || "100%"};
  margin: ${(props) => props.spacing || 0};
  font-size: ${(props) =>
    props.big ? "12px" : props.medium ? "12px" : props.small ? "12px" : "12px"};
`;

export const DropDownP = styled(DropDown).attrs(({ theme }) => ({
  mode: "",
  activeColor: theme.brand,
  theme: {
    colors: {
      background: theme.primary,
      placeholder: theme.darkLight,
      primary: theme.tertiary,
      text: theme.tertiary,
    },
  },
}))``;

export const Button = styled(ButtonPaper).attrs((props) => ({
  mode: props.mode || "contained",
  uppercase: true,
  color: props.theme[props.background] || props.background || props.theme.brand,
  labelStyle: {
    color: props.theme[props.textColor || "primary"],
    letterSpacing: 1,
    fontFamily: "Inter_700Bold",
    fontSize: props.size || 12,
  },
}))`
  width: ${(props) => props.width || "85%"};
  height: ${(props) => props.height || "auto"};
  margin: ${(props) => props.spacing || "0 auto"};
  padding: ${(props) => props.hasPadding || 0};
  border-radius: ${(props) => props.radius || "10px"};
`;

export const ExtraView = styled.View`
  width: ${(props) => props.width || "100%"};
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

export const ExtraText = styled.Text`
  width: ${(props) => props.width || "100%"};
  justify-content: center;
  align-content: center;
  color: ${(props) => props.theme[props.color || "tertiary"]};
  font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
  width: ${(props) => props.width || "100%"};
  justify-content: center;
  align-items: flex-end;
`;

export const TextLinkContent = styled.Text`
  color: ${(props) => props.theme[props.color || "brand"]};
  font-size: ${(props) =>
    props.small ? "13px" : props.medium ? "15px" : "15px"};
  padding: ${(props) => (props.hasPadding ? "5px" : "0px")};
  background: ${(props) =>
    props.theme[props.background] || props.background || "transparent"};
`;

export const StatusBarHeight = Constants.statusBarHeight;

// Colors
export const Colors = {
  primary: "#FFFFFF",
  secondary: "#E5E7EB",
  tertiary: "#1F2937",
  darkLight: "#9CA3AF",
  brand: "#F0560A",
  green: "#10B981",
  red: "#EF4444",
  blue: "#0386D0",
};

const { primary, secondary, tertiary, darkLight, brand, green, red, blue } =
  Colors;

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${brand};
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-vertical: 5px;
  height: 60px;
  ${(props) =>
    props.google == true &&
    `
        background-color: ${secondary};
        flex-direction: row;
        justify-content: center;
        margin-top: 20px;
    `}
`;

export const ButtonText = styled.Text`
  color: ${primary};
  font-size: 18px;
  ${(props) =>
    props.google == true &&
    `    
        padding-left: 10px;x
        color: ${darkLight};
    `}
`;

export const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#242f3e",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#746855",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#242f3e",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        color: "#1c1c1c",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bababa",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#263c3f",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6b9a76",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#38414e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#212a37",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9ca5b3",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#746855",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#1f2835",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#f3d19c",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#2f3948",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#17263c",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#515c6d",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#17263c",
      },
    ],
  },
];
