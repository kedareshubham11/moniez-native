import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { BottomNavigation, Text } from "react-native-paper";
import { theme } from "../core/theme";
import { Tab1, Tab2, Tab4, Tab3, Tab5 } from "../components/Tabs";

export default function Dashboard({ navigation }) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "analytics", title: "Analytics", icon: "database" },
    {
      key: "category",
      title: "Category",
      icon: "tab",
    },
    { key: "all", title: "View All", icon: "history" },
    {
      key: "abc",
      title: "Wealth Management",
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
