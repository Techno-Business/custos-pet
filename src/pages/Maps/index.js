import React, { useEffect, useState } from "react";
import { StyleSheet, View, Box, Title } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { REACT_APP_GOOGLE_MAPS_API_KEY } from "@env";
import { useTranslation } from "react-i18next";
import { navigate } from "./../../services/navigation";

import {
  ButtonText,
  mapStyle,
  StatusBarHeight,
  StyledButton,
  Colors,
  Button,
} from "./../../components";

let baseMapsAPIURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;
let apiKey = REACT_APP_GOOGLE_MAPS_API_KEY;

const Maps = () => {
  const { t, i18n } = useTranslation();
  const coordinates = { lat: -23.550456, lng: -46.633911 };
  const [mapRegion, setMapRegion] = useState({
    latitude: coordinates.lat,
    longitude: coordinates.lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      let { statusPermission } =
        await Location.requestForegroundPermissionsAsync();
      if (statusPermission !== "granted") {
        return;
      }
    })();
  }, []);

  const [location, setLocation] = useState({
    latitude: -23.550456,
    longitude: -46.633911,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const [markers, setMarkers] = useState([]);
  const searchGeneric = (placetype) => {
    let locationLat = location.latitude;
    let locationLng = location.longitude;
    let mapsApi = `${baseMapsAPIURL}?location=${locationLat},${locationLng}&rankby=distance&type=${placetype}&key=${apiKey}`;

    fetch(mapsApi)
      .then((response) => response.json())
      .then((data) => {
        setMarkers(data.results);
      })
      .catch((error) => console.log(error));
  };

  const searchVeterinarians = () => {
    searchGeneric("veterinary_care");
  };

  const searchPetStores = () => {
    searchGeneric("pet_store");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={mapRegion}
        zoomEnabled={true}
        showsUserLocation={true}
        showsCompass={true}
        customMapStyle={mapStyle}
      >
        {markers.map((marker) => {
          return (
            <Marker
              key={marker.place_id}
              coordinate={{
                latitude: marker.geometry.location.lat,
                longitude: marker.geometry.location.lng,
              }}
              title={marker.name}
            />
          );
        })}
      </MapView>

      <View style={styles.mapDetails}>
        <View style={{ width: "15%", marginRight: 30, paddingTop: 5 }}>
          <Button
            width="10%"
            spacing="0 40px 0 0"
            hasPadding="0 0 0 15px"
            icon="home"
            size={30}
            onPress={() => navigate("Home")}
          ></Button>
        </View>

        <View style={{ width: "60%" }}>
          <StyledButton onPress={searchVeterinarians}>
            <ButtonText>{t("VETERINARIAN")}</ButtonText>
          </StyledButton>
          <StyledButton onPress={searchPetStores}>
            <ButtonText>PET SHOP</ButtonText>
          </StyledButton>
        </View>
      </View>
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.brand,
    alignItems: "center",
    justifyContent: "center",
    marginTop: StatusBarHeight,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapDetails: {
    position: "absolute",
    alignSelf: "center",
    width: 320,
    top: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  bubble: {
    flexDirection: "row",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: 0.5,
    padding: 15,
    width: 150,
  },
  name: {
    fontSize: 12,
    marginBottom: 5,
  },
});
