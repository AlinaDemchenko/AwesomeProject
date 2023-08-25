import React from "react";
import {
  StyledFormField,
  StyledRegistrationScreen,
  StyledSubmitButton,
  StyledTitle,
  StyledUserImage,
} from "./RegistrationScreen.styled";
import Input from "../../components/Input/Input";
import { Text } from "react-native";
import SVGAdd from "../../assets/images/add.svg";

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
      <StyledTitle style={{ fontFamily: "Roboto-Medium", fontSize: 30 }}>
        Реєстрація
      </StyledTitle>
      <StyledFormField>
        <Input placeholder="Логін" />
        <Input placeholder="Адреса електронної пошти" />
        <Input placeholder="Пароль" />
        <Text
          style={{
            position: "absolute",
            color: "#1B4371",
            bottom: 6,
            right: 16,
            fontFamily: "Roboto",
            fontSize: 16,
          }}
        >
          Показати
        </Text>
      </StyledFormField>
      <StyledSubmitButton>
        <Text style={{ color: "#fff", fontFamily: "Roboto", fontSize: 16 }}>
          Зареєстуватися
        </Text>
      </StyledSubmitButton>
      <Text style={{ color: "#1B4371", fontFamily: "Roboto", fontSize: 16 }}>
        Вже є акаунт? Увійти
      </Text>
    </StyledRegistrationScreen>
  );
}

export default RegistrationScreen;
