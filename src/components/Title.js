import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "../core/theme";

export default function Title(props) {
  return <Text style={styles.header} {...props} />;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    color: theme.colors.primary,
    fontWeight: "bold",
    paddingVertical: 10,
    textTransform: "capitalize",
  },
});
