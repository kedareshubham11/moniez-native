import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "../core/theme";
import {
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
const screenWidth = Dimensions.get("window").width;

export default function HeaderBar(props) {
  return (
    <View style={styles.container} {...props}>
      <View style={styles.left}>
        <MaterialCommunityIcons
          name="face-man-profile"
          size={24}
          color="black"
        />
        <Text>Hi, Shubham</Text>
      </View>
      <View style={styles.right}>
        <AntDesign name="search1" size={24} color="black" />
        <Ionicons name="notifications" size={24} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: "bold",
    paddingVertical: 12,
    textTransform: "capitalize",
    backgroundColor: "#181818",
    display: "flex",
    flexDirection: "column",
    width: "100",
  },
  left: {
    display: "flex",
  },
  right: {
    display: "flex",
  },
});
