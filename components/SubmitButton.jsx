import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

function SubmitButton({ children, onPress, disabled }) {
  return (
    <TouchableOpacity style={[
      styles.submitButton,
      { backgroundColor: disabled ? "#F6F6F6" : "#FF6C00" },
    ]} onPress={onPress} disabled={disabled}>{children}</TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  submitButton: {
    maxHeight: 51,
    width: "100%",
    borderRadius: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
});

export default SubmitButton;
