import React, { useState } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
// import BackButton from "../components/BackButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Linking, View } from "react-native";
import axios from "axios";
// import BeautyWebView from "react-native-beauty-webview";
import { useSelector, useDispatch } from "react-redux";
import { updateAAData } from "../store/actions/aa";
import axios from "../helpers/axios/axios";

export default function ProfileForm({ navigation }) {
  console.log(baseUrl, "base");
  const dispatch = useDispatch();
  const phoneNo = useSelector((state) => state.user.username);
  console.log(phoneNo, "u");
  // const [visible, setVisible] = useState(false);
  // const [consentUrl, setConsentUrl] = useState("https://www.google.com");
  const onSubmit = () => {
    const payload = {
      phonenumber: phoneNo,
    };

    axios
      .post("/initiate-consent", payload)
      .then(function (response) {
        console.log(response.data);
        dispatch(updateAAData(response.data));
        // setConsentUrl(response.data.redirection_url);
        // setVisible(true);
        openUrlInBrowser(response.data.redirection_url);
        navigation.reset({
          index: 0,
          routes: [{ name: "StartScreen" }],
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    //
  };

  const openUrlInBrowser = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}
      {/* <Header>Moniez</Header> */}
      <Logo />
      <View style={{ display: "flex", alignItems: "center", marginTop: 30 }}>
        <MaterialCommunityIcons
          name="transit-connection-variant"
          size={40}
          color="white"
        />
        <Header>Connect Account Aggrigator</Header>
      </View>

      <Button mode="contained" onPress={onSubmit}>
        CONNECT
      </Button>
      {/* {visible && (
        <BeautyWebView
          visible={visible} // Required for open and close
          onPressClose={() => console.log("sdfsdfs")} // Required for closing the modal
          url={consentUrl}
            extraMenuItems={[
              {
                title: "Extra Item",
                onPress: () => console.log("Extra Menu Item Clicked"),
              },
            ]}
        />
      )} */}
    </Background>
  );
}
