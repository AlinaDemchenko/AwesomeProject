import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import Title from "../components/Title";
import Input from "../components/Input";
import FormField from "../components/FormField";
import SubmitButton from "../components/SubmitButton";

function LoginScreen() {
  return (
    <ImageBackground
    source={require("../assets/images/backgroung.png")}
    resizeMode="cover"
    style={styles.imageBackground}
  >
    <View style={styles.loginScreen}>
      <Title>Увійти</Title>
      <FormField>
        <Input placeholder="Адреса електронної пошти" />
        <Input placeholder="Пароль" />
        <Text
        style={{
          position: "absolute",
          color: "#1B4371",
          top: 82,
          right: 16,
          fontFamily: "Roboto",
          fontSize: 16,
        }}
      >
        Показати
      </Text>
      </FormField>
      <SubmitButton>
        <Text style={{ color: "#fff", fontFamily: "Roboto", fontSize: 16 }}>
          Увійти
        </Text>
      </SubmitButton>
      <Text style={{ color: "#1B4371", fontFamily: "Roboto", fontSize: 16 }}>
        Немає акаунту?{" "}
        <Text style={{ textDecorationLine: "underline" }}>Зареєструватися</Text>
      </Text>
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
  loginScreen: {
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
});

export default LoginScreen;
