import React from "react";
import { Text, View } from "react-native";
import { StyledLoginScreen } from "./LoginScreen.styled";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import FormField from "../../components/FormField/FormField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";

function LoginScreen() {
  return (
    <StyledLoginScreen>
      <Title>Увійти</Title>
      <FormField>
        <Input placeholder="Адреса електронної пошти" />
        <Input placeholder="Пароль" />
        <Text
        style={{
          position: "absolute",
          color: "#1B4371",
          top: 80,
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
    </StyledLoginScreen>
  );
}

export default LoginScreen;
