import React from "react";
import { ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import SVGAdd from "../assets/images/add.svg";
import SVGLogout from "../assets/images/log-out.svg";
import { useNavigation } from "@react-navigation/native";

function ProfileScreen() {
const navigation = useNavigation(); 

  return (
    <ImageBackground
      source={require("../assets/images/backgroung.png")}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <View style={styles.profileScreen}>
      <View style={styles.userImage}>
              <SVGAdd
                width={25}
                height={25}
                style={{ position: "absolute", right: -12, bottom: 14 }}
              />
            </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{position: "absolute", top: 22, right: 16}}
        >
        <SVGLogout width={24} height={24} />
      </TouchableOpacity>
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
  },
  profileScreen: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
    maxHeight: 489,
    width: "100%",
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 144,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    position: "relative",
  },
  userImage: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    position: "absolute",
    top: -60,
  },
});

export default ProfileScreen;
