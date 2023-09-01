import React from "react";
import { StyleSheet, TextInput } from "react-native";

function Input({
  placeholder,
  secureTextEntry,
  keyboardType,
  value,
  setter,
  isFocused,
  handleFocus,
  name,
  onBlur
}) {
  return (
    <TextInput
      name={name}
      secureTextEntry={secureTextEntry}
      onChangeText={setter}
      value={value}
      placeholder={placeholder}
      placeholderTextColor="#BDBDBD"
      keyboardType={keyboardType ? keyboardType : "default"}
      style={[
        styles.input,
        { backgroundColor: isFocused ? "#fff" : "#F6F6F6" },
        { borderColor: isFocused ? "#FF6C00" : "#E8E8E8" },
      ]}
      onFocus={handleFocus}
      onBlur={onBlur}
    />
  );
}

export const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderStyle: "solid",
    paddingHorizontal: 16,
    borderRadius: 7,
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#212121",
  },
});

export default Input;
