import React from 'react'
import { StyleSheet, Text } from 'react-native';

function Title({children}) {
  return (
   <Text style={styles.title}>{children}</Text>
  )
}

export const styles = StyleSheet.create({
  title: {
    color: "#212121",
    marginBottom: 33,
    letterSpacing: 0.3,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
  },
});

export default Title