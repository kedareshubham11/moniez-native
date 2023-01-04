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
    {
      key: "home",
      title: "Home",
      icon: "home",
    },
    { key: "analytics", title: "Analytics", icon: "google-analytics" },
    {
      key: "category",
      title: "Personalized",
      icon: "ballot-recount",
    },
    { key: "all", title: "Explore", icon: "hand-coin" },

    {
      key: "profile",
      title: "Profile",
      icon: "face-man-profile",
    },
  ]);

  const ProfileTab = () => {
    return <Tab5 navigation={navigation} />;
  };

  const renderScene = BottomNavigation.SceneMap({
    home: Tab1,
    analytics: Tab2,
    category: Tab3,
    all: Tab4,
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
