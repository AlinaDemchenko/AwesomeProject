import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

function SubmitButton({ children, onPress, disabled }) {
  return (
    <TouchableOpacity style={[
      styles.submitButton,
      { opacity: disabled ? 0.5 : 1 },
    ]} onPress={onPress} disabled={disabled}>{children}</TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  submitButton: {
    maxHeight: 51,
    backgroundColor: "#FF6C00",
    width: "100%",
    borderRadius: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
});

export default SubmitButton;
