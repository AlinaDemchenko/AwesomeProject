import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  Pressable,
} from "react-native";
import { Camera } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import * as ImagePicker from "expo-image-picker";
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
  // const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);
  const token = user ? user.token : null;

  const writeDataToFirestore = async (post) => {
    try {
      const docRef = await addDoc(collection(db, "Posts"), post);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  };

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
      setAddress(`${reverseGeocodedAddress[0].city}, ${reverseGeocodedAddress[0].country}`);
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

  const handleAddPicture = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        const pictureURL = result.assets[0].uri;
        setPhoto(pictureURL);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserLocationCoords = async () => {
    const geocodedLocation = await Location.geocodeAsync(userLocation);
    if (!geocodedLocation[0]?.longitude) {
      Alert.alert(`Failed to get coordinates of ${userLocation}`);
    }
    if (geocodedLocation[0]?.longitude) {
      return geocodedLocation[0];
    }
  };

  const handleSubmit = async () => {
    const date = new Date().toISOString();
    if (userLocation) {
      const userCoords = await getUserLocationCoords();
      const post = {
        date,
        photo,
        address: userLocation,
        name: name.length > 0 ? name : "",
        accuracy: 0,
        longitude: userCoords.longitude,
        latitude: userCoords.latitude,
        token
      };
      if (userCoords) {
        // dispatch(addPost(post));
        writeDataToFirestore(post);
        navigation.navigate("Posts");
        clearPage();
        return;
      }
    }
    if (location && !userLocation) {
      const post = {
        date,
        photo,
        address,
        name: name.length > 0 ? name : "",
        accuracy: location.accuracy,
        longitude: location.longitude,
        latitude: location.latitude,
        token
      };
      // dispatch(addPost(post));
      writeDataToFirestore(post);
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
      <Pressable style={{ marginBottom: 32 }} onPress={handleAddPicture}>
        <Text
          style={{
            color: "#BDBDBD",
            fontSize: 16,
            fontFamily: "Roboto",
          }}
        >
          {photo ? "Редагувати фото" : "Завантажте фото"}
        </Text>
      </Pressable>
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
