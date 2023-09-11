import SVGAdd from "../assets/images/add.svg";
import SVGLogout from "../assets/images/log-out.svg";
import SVGdelete from "../assets/images/delete.svg";
import * as ImagePicker from "expo-image-picker";
import Post from "../components/Post";
import React, { useEffect, useState } from "react";
import { signOut, updateProfile } from "firebase/auth";
import { auth, storage } from "../firebase/firebase-config";
import { ref, getDownloadURL} from "firebase/storage";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { changeAvatar, signIn } from "../redux/userReducer";
import { clearPosts } from "../redux/contentReducer";
import { uploadPhotoToFirebase } from "../firebase/firebase-utils";


function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);
  const posts = useSelector((state) => state.content.posts);
  [userPosts, setUserPosts] = useState();
  const avatar = user ? user.photoURL : null;
  const token = user ? user.token : null;
  const name = user ? user.displayName : null;

  useEffect(() => {
    const filteredPosts = posts.filter((post) => post.token === token);
    setUserPosts(filteredPosts);
  }, [posts]);

  const handleAddAvatar = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const avatarURL = result.assets[0].uri;
        dispatch(changeAvatar(avatarURL));
        const photoId = new Date().getTime();
        const imagePath = `images/${photoId}.jpg`;
        await uploadPhotoToFirebase(avatarURL,imagePath)
        const imageURL = await getDownloadURL(ref(storage, imagePath));
        await updateProfile(auth.currentUser, {
          photoURL: imageURL,
        });
      }
    } catch (error) {
      if (error instanceof RangeError) {
        console.log(error.message);
      } else {
        console.error(error);
      }
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      dispatch(changeAvatar(null));
      const currentUser = auth.currentUser;
      if (currentUser) {
        await updateProfile(currentUser, {
          photoURL: "",
        });
      }
    } catch (error) {
      console.log("Error updating profile:", error.message);
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .then(() => {
        dispatch(signIn(null));
        dispatch(clearPosts());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ImageBackground
      source={require("../assets/images/backgroung.png")}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <View style={styles.profileScreen}>
        <View style={{ position: "absolute", top: -60 }}>
          {avatar ? (
            <>
              <Image style={styles.userImage} source={{ uri: avatar }} />
              <Pressable
                onPress={handleRemoveAvatar}
                style={{ position: "absolute", right: -12, bottom: 14 }}
              >
                <SVGdelete width={25} height={25} />
              </Pressable>
            </>
          ) : (
            <>
              <View style={styles.userImage}></View>
              <Pressable
                onPress={handleAddAvatar}
                style={{ position: "absolute", right: -12, bottom: 14 }}
              >
                <SVGAdd width={25} height={25} />
              </Pressable>
            </>
          )}
        </View>
        <TouchableOpacity
          onPress={handleSignOut}
          style={{ position: "absolute", top: 22, right: 16 }}
        >
          <SVGLogout width={24} height={24} />
        </TouchableOpacity>
        <Text
          style={{
            color: "#212121",
            fontFamily: "Roboto-Medium",
            fontSize: 30,
            letterSpacing: 0.3,
            marginBottom: 33,
          }}
        >
          {name}
        </Text>
        <ScrollView style={{ height: "100%", width: "100%" }}>
          {userPosts?.length > 0 &&
            userPosts.map((post) => <Post post={post} key={post.id} />)}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

export const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 117,
  },
  profileScreen: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
   height: "100%",
    width: "100%",
    paddingTop: 92,
    paddingHorizontal: 16,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    position: "relative",
  },
  userImage: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
});

export default ProfileScreen;
