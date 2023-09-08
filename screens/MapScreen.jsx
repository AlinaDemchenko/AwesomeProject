import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

function MapScreen() {
  let pictureData = {
    address: { city: "Mountain View", country: "United States" },
    location: {
      accuracy: 899.9990234375,
      latitude: 37.4226711,
      longitude: -122.0849872,
    },
    name: "Tiger",
    photo:
      "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FAwesomeProject-fc89d585-989d-4c92-ab43-6747eeab5627/Camera/eb7ef868-38af-4f68-bf0b-45736c0584df.jpg",
  };

  const regionFrom = (lat, lon, accuracy) => {
    const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
    const circumference = (40075 / 360) * 1000;

    const latDelta = accuracy * (1 / (Math.cos(lat) * circumference));
    const lonDelta = accuracy / oneDegreeOfLongitudeInMeters;

    return {
      latitude: lat,
      longitude: lon,
      latitudeDelta: Math.max(0, latDelta),
      longitudeDelta: Math.max(0, lonDelta),
    };
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={regionFrom(
          pictureData.location.latitude,
          pictureData.location.longitude,
          pictureData.location.accuracy
        )}
        mapType="standard"
        minZoomLevel={15}
        // onMapReady={() => console.log("Map is ready")}
        // onRegionChange={() => console.log("Region change")}
      >
        <Marker
          title={`${pictureData.address.city}, ${pictureData.address.country}`}
          coordinate={{ latitude: pictureData.location.latitude, longitude: pictureData.location.longitude }}
          // description={}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: "100%",
    height: "100%",
  },
});

export default MapScreen;
