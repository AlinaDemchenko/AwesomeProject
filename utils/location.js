import * as Location from "expo-location";

export const getUserLocationCoords = async (userLocation) => {
    const geocodedLocation = await Location.geocodeAsync(userLocation);
    if (!geocodedLocation[0]?.longitude) {
      Alert.alert(`Failed to get coordinates of ${userLocation}`);
    }
    if (geocodedLocation[0]?.longitude) {
      return geocodedLocation[0];
    }
  };