import { useRoute } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

function MapScreen() {
  const { params: { post } } = useRoute();

  if (!post.latitude){
 userLocationCoords()
  }

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
          post.latitude,
          post.longitude,
          post.accuracy
        )}
        mapType="standard"
        minZoomLevel={15}
      >
        <Marker
          title={post.address}
          coordinate={{ latitude: post.latitude, longitude: post.longitude }}
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
