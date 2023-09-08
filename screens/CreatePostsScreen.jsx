import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/reducer";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import SVGlocation from "../assets/images/map-pin.svg";
import SubmitButton from "../components/SubmitButton";

function CreatePostsScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        accuracy: currentLocation.coords.accuracy,
      });
      setAddress(`${reverseGeocodedAddress[0].city},
      ${reverseGeocodedAddress[0].country}`);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const clearPage = () => {
    setPhoto(null);
    setUserLocation(null);
    setName("");
  };

  const handleShot = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setPhoto(uri);
    }
  };

  const getUserLocationCoords = async () => {
    const geocodedLocation = await Location.geocodeAsync(userLocation);
    // console.log("geocodedLocation: ", geocodedLocation);
    if (!geocodedLocation[0]?.longitude) {
      // console.log(geocodedLocation[0]?.longitude);
      Alert.alert(`Failed to get coordinates of ${userLocation}`);
    }
    if (geocodedLocation[0]?.longitude) {
      return geocodedLocation[0]
    }
  };

  const handleSubmit = async () => {
    if (userLocation) {
    const userCoords = await getUserLocationCoords();
      if(userCoords){
        dispatch(
          addPost({
            photo,
            address: userLocation,
            name: name.length > 0 ? name : "",
            location: userCoords,
          })
          );

      console.log('location: ', location);
          navigation.navigate("Posts");
          clearPage();
          return
      }
    }
    if (location && !userLocation) {
      dispatch(
        addPost({
          photo,
         address,
          name: name.length > 0 ? name : "",
          location,
        })
        );

      console.log('location: ', location);
        navigation.navigate("Posts");
        clearPage();
      }
    };

  return (
    <View style={styles.createContainer}>
      <View style={styles.photoBlock}>
        {photo ? (
          <Image
            source={{ uri: photo }}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <Camera style={styles.camera} type={type} ref={setCameraRef}>
            <View style={styles.photoView}>
              <TouchableOpacity
                style={styles.flipContainer}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <FontAwesome name="rotate-right" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleShot}>
                <View style={styles.takePhoto}>
                  <FontAwesome name="camera" size={24} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          </Camera>
        )}
      </View>
      <Text
        style={{
          color: "#BDBDBD",
          fontSize: 16,
          marginBottom: 32,
          fontFamily: "Roboto",
        }}
      >
        {photo ? "Редагувати фото" : "Завантажте фото"}
      </Text>
      <TextInput
        onChangeText={setName}
        value={name}
        placeholder="Назва..."
        placeholderTextColor="#BDBDBD"
        style={[styles.input, { marginBottom: 16 }]}
      />
      <View style={{ position: "relative", marginBottom: 32 }}>
        <SVGlocation
          width={24}
          height={24}
          style={{ position: "absolute", left: 0, top: 13 }}
        />
        <TextInput
          style={[styles.input, { paddingLeft: 28 }]}
          placeholder="Місцевість..."
          onChangeText={setUserLocation}
          value={userLocation}
          placeholderTextColor="#BDBDBD"
          maxLength={50}
        />
      </View>
      <SubmitButton onPress={handleSubmit} disabled={!photo}>
        <Text
          style={{
            color: photo ? "#fff" : "#BDBDBD",
            fontFamily: "Roboto",
            fontSize: 16,
          }}
        >
          Опубліковати
        </Text>
      </SubmitButton>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={clearPage}
        disabled={!photo}
      >
        <Feather name="trash-2" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  photoBlock: {
    height: 240,
    width: "100%",
    backgroundColor: "#F6F6F6",
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 8,
  },
  createContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
  camera: { flex: 1 },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  flipContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  button: { alignSelf: "center" },
  takePhoto: {
    height: 60,
    width: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.30)",
  },
  input: {
    fontSize: 16,
    height: 50,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontFamily: "Roboto",
  },
  deleteButton: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 22,
  },
});

export default CreatePostsScreen;
