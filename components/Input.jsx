import React from 'react'
import { StyleSheet, TextInput } from 'react-native';

function Input({placeholder}) {
    const [text, onChangeText] = React.useState('');

  return (
    <TextInput
    onChangeText={onChangeText}
    value={text}
    placeholder={placeholder}
    placeholderTextColor="#BDBDBD"
    style={styles.input}
    />
  )
}

export const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    paddingHorizontal: 16,
    borderRadius: 7,
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#212121",
},
});

export default Input