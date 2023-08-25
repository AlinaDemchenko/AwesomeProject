import React from "react";
import {
  StyledRegistrationScreen,
  StyledUserImage,
} from "./RegistrationScreen.styled";
import Input from "../../components/Input/Input";
import { Text } from "react-native";
import SVGAdd from "../../assets/images/add.svg";
import Title from "../../components/Title/Title";
import FormField from "../../components/FormField/FormField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";

function RegistrationScreen() {
  return (
    <StyledRegistrationScreen>
      <StyledUserImage>
        <SVGAdd
          width={25}
          height={25}
          style={{ position: "absolute", right: -12, bottom: 14 }}
        />
      </StyledUserImage>
      <Title style={{ fontFamily: "Roboto-Medium", fontSize: 30 }}>
        Реєстрація
      </Title>
      <FormField>
        <Input placeholder="Логін" />
        <Input placeholder="Адреса електронної пошти" />
        <Input placeholder="Пароль" />
      </FormField>
      <SubmitButton>
        <Text style={{ color: "#fff", fontFamily: "Roboto", fontSize: 16 }}>
          Зареєстуватися
        </Text>
      </SubmitButton>
      <Text style={{ color: "#1B4371", fontFamily: "Roboto", fontSize: 16 }}>
        Вже є акаунт? Увійти
      </Text>
    </StyledRegistrationScreen>
  );
}

export default RegistrationScreen;
