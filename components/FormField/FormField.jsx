import React from "react";
import { StyledFormField } from "./FormField.styled";
import { Text } from "react-native";

function FormField({ children }) {
  return (
    <StyledFormField>
      {children}
    </StyledFormField>
  );
}

export default FormField;
