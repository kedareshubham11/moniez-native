import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "../core/theme";
import { Entypo } from "@expo/vector-icons";
import Header from "./Header";
import { ScrollView } from "react-native-gesture-handler";

export default function Investments({ investments }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Investments</Text>
        <Text style={styles.price}>
          Total Value ₹{investments?.total_sum || 0}
        </Text>
      </View>
      <ScrollView horizontal={true}>
        <View style={styles.cardContainer}>
          <View style={styles.cards}>
            <Entypo name="bar-graph" size={24} color="green" />
            <Text style={styles.text}>Mutual Funds</Text>
            <Text style={styles.price}>₹{investments?.mutual_fund || 0}</Text>
          </View>
          <View style={styles.cards}>
            <Entypo name="bar-graph" size={24} color="green" />
            <Text style={styles.text}>Stocks</Text>
            <Text style={styles.price}>₹{investments?.Stocks || 0}</Text>
          </View>
          <View style={styles.cards}>
            <Entypo name="bar-graph" size={24} color="green" />
            <Text style={styles.text}>Crypto</Text>
            <Text style={styles.price}>₹{investments?.crypto || 0}</Text>
          </View>
          <View style={styles.cards}>
            <Entypo name="bar-graph" size={24} color="green" />
            <Text style={styles.text}>Commodities</Text>
            <Text style={styles.price}>₹{investments?.Commodities || 0}</Text>
          </View>
        </View>
      </ScrollView>
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
    width: 400,
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-evenly",
    // flexWrap: "wrap",
    paddingVertical: 10,
  },
  cards: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 2,
    margin: 5,
    width: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
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
