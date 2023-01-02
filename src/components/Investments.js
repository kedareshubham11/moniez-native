import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "../core/theme";
import { Entypo } from "@expo/vector-icons";
import Header from "./Header";

export default function Investments({ investments }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Total Investments</Text>
        <Text style={styles.price}>20L</Text>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.cards}>
          <Entypo name="bar-graph" size={24} color="white" />
          <Text style={styles.text}>Mutual Funds</Text>
          <Text style={styles.price}>$12322</Text>
        </View>
        {/* <View styles={styles.cards}>
          <Entypo name="bar-graph" size={24} color="white" />
          <Text style={styles.text}>Mutual Funds</Text>
          <Text style={styles.price}>$12322</Text>
        </View> */}
        {/* <View styles={styles.cards}>
          <Entypo name="bar-graph" size={24} color="white" />
          <Text style={styles.text}>Mutual Funds</Text>
          <Text style={styles.price}>$12322</Text>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
    backgroundColor: "#171717",
    borderRadius: 10,
    padding: 10,
  },
  cardContainer: {
    // width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-evenly",
    // flexWrap: "wrap",
  },
  cards: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 2,
    margin: 20,
    minWidth: 100,
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
    paddingVertical: 12,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    paddingVertical: 12,
  },
  price: {
    fontWeight: "800",
  },
});
