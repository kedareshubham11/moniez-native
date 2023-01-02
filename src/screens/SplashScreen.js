import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import { useSelector, useDispatch } from "react-redux";

export default function SplashScreen({ navigation }) {
  user = useSelector((state) => state.userData.data);
  setTimeout(async () => {
    if (!user.tracking_id) {
      navigation.navigate("LoginScreen");
    } else {
      navigation.navigate("Dashboard");
    }
  }, 1500);
  return (
    <Background>
      <Logo />
    </Background>
  );
}
