import React from "react";
import { StyledSubmitButton } from "./SubmitButton.styled";

function SubmitButton({ children }) {
  return <StyledSubmitButton>{children}</StyledSubmitButton>;
}

export default SubmitButton;
