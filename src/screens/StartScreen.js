import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import { Image } from "react-native";

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Image
        source={require("../assets/credit-cards.png")}
        style={{ marginBottom: 20 }}
      />
      <Button mode="contained" onPress={() => navigation.navigate("Dashboard")}>
        GET Started
      </Button>
    </Background>
  );
}
