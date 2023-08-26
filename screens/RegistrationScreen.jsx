import React from "react";
import Input from "../components/Input";
import { ImageBackground, StyleSheet, Text, View} from "react-native";
import SVGAdd from "../assets/images/add.svg";
import Title from "../components/Title";
import FormField from "../components/FormField";
import SubmitButton from "../components/SubmitButton";

function RegistrationScreen() {
  return (
    <ImageBackground
    source={require("../assets/images/backgroung.png")}
    resizeMode="cover"
    style={styles.imageBackground}
  >
    <View style={styles.registrationScreen}>
      <View style={styles.userImage}>
        <SVGAdd
          width={25}
          height={25}
          style={{ position: "absolute", right: -12, bottom: 14 }}
        />
      </View>
      <Title style={{ fontFamily: "Roboto-Medium", fontSize: 30 }}>
        Реєстрація
      </Title>
      <FormField>
        <Input placeholder="Логін" />
        <Input placeholder="Адреса електронної пошти" />
        <Input placeholder="Пароль" />
        <Text
        style={{
          position: "absolute",
          color: "#1B4371",
          top: 148,
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
          Зареєстуватися
        </Text>
      </SubmitButton>
      <Text style={{ color: "#1B4371", fontFamily: "Roboto", fontSize: 16 }}>
        Вже є акаунт? Увійти
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
  registrationScreen: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "white",
    alignItems: "center",
    maxHeight: 549,
    width: "100%",
    paddingTop: 92,
    paddingHorizontal: 16,
    paddingBottom: 78,
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

export default RegistrationScreen;
