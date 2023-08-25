import React from "react";
import { StyledFormField } from "./FormField.styled";
import { Text } from "react-native";

function FormField({ children }) {
  return (
    <StyledFormField>
      {children}
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
  );
}

export default FormField;
