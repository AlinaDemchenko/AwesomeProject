import React from "react";
import { StyleSheet, View } from "react-native";

function FormField({ children }) {
  return (
    <View style={styles.formField}>
      {children}
    </View>
  );
}

export const styles = StyleSheet.create({
  formField: {
    position: "relative",
    width: "100%",
    flex: 1,
    alignItems: "stretch",
    gap: 16,
    marginBottom: 43,
},
});

export default FormField;
