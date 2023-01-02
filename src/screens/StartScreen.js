import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Header>Moniez</Header>
      <Logo />
      <Button mode="contained" onPress={() => navigation.navigate("Dashboard")}>
        GET Started
      </Button>
    </Background>
  );
}
