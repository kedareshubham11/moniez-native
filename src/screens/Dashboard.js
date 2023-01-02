import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { saveToLocal } from "../helpers/secureStore/index";
import { BottomNavigation, Text } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "../core/theme";
import { Tab1, Tab2, Tab4, Tab3, Tab5 } from "../components/Tabs";

export default function Dashboard({ navigation }) {
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    {
      key: "category",
      title: "Category",
      icon: "tab",
    },
    { key: "analytics", title: "Analytics", icon: "database" },
    { key: "all", title: "View All", icon: "history" },
    {
      key: "abc",
      title: "Abc",
      icon: "tab",
    },
    {
      key: "profile",
      title: "Profile",
      icon: "face-man-profile",
    },
  ]);

  const ProfileTab = () => {
    return <Tab4 navigation={navigation} />;
  };

  const renderScene = BottomNavigation.SceneMap({
    category: Tab2,
    analytics: Tab1,
    all: Tab3,
    abc: Tab5,
    profile: ProfileTab,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      theme={theme}
      activeColor="#cecece"
      inactiveColor="#cecece"
      // barStyle={{ backgroundColor: "#694fad", color: "#cecece" }}
    />
  );
}
