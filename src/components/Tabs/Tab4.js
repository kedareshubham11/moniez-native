import {
  Dimensions,
  View,
  ScrollView,
  StyleSheet,
  Modal,
  Linking,
  Image,
} from "react-native";
import { Text } from "react-native-paper";
import Background from "../Background";
import Header from "../Header";
import Card from "../Card";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../helpers/axios/axios";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Button from "../../components/Button";
import { theme } from "../../core/theme";
import CustomModal from "../Modal";
import RowCard from "../Card/RowCard";

import Loader from "../Loader";
export default function Tab() {
  const storeData = useSelector((state) => state);
  const userData = storeData.userData.data;
  const Tab = createMaterialTopTabNavigator();
  const [recommendations, setRecommendations] = useState({
    data: {},
    loader: true,
  });
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getAllRecomendation();
  }, []);

  const getAllRecomendation = () => {
    const payload = {
      tracking_id: userData.tracking_id,
      reference_id: userData.refrence_id,
    };

    setRecommendations({ ...recommendations, loader: true });
    axios
      .get("/allinvestmentoptions")
      .then((response) => {
        const data = response.data.data;
        setRecommendations({ data: data, loader: false });
      })
      .catch(function (error) {
        console.log(error);
      });
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

  const onPressTrade = () => {
    openUrlInBrowser(
      "https://play.google.com/store/apps/details?id=com.intellectsoftwares.bobitrade&hl=en_IN&gl=US"
    );
  };

  const onPressCreate = () => {
    openUrlInBrowser("https://ekyc.barodaetrade.com");
  };

  const ModalComponent = () => {
    return (
      <View>
        <Button mode="outlined" onPress={onPressCreate}>
          <View style={styles.customeButton}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                textTransform: "uppercase",
              }}
            >
              Open Demat
            </Text>
            <Image
              source={require("../../assets/bob.webp")}
              style={{ height: 30, width: 30, marginLeft: 10 }}
            />
          </View>
        </Button>

        <Button mode="outlined" onPress={onPressTrade}>
          <View style={styles.customeButton}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                textTransform: "uppercase",
              }}
            >
              Invest With
            </Text>
            <Image
              source={require("../../assets/bob.webp")}
              style={{ height: 30, width: 30, marginLeft: 10 }}
            />
          </View>
        </Button>
      </View>
    );
  };

  return (
    <>
      {!recommendations.loader ? (
        <Tab.Navigator
          tabBarPosition="top"
          initialLayout={{
            width: Dimensions.get("window").width,
          }}
          screenOptions={{
            tabBarLabelStyle: { fontSize: 14, fontWeight: "700" },
            tabBarItemStyle: { width: "100%" },
            tabBarStyle: {
              backgroundColor: theme.colors.secondary,
              color: "red",
              borderColor: "#000",
              scroll: "auto",
            },
          }}
          tabBarScrollEnabled={true}
        >
          {Object.entries(recommendations.data).map(([key, value], pIndex) => {
            const TabComponent = () => {
              return (
                <ScrollView>
                  <View style={styles.tabContainer}>
                    {value.map((item, index) => (
                      <RowCard
                        item={item}
                        key={`${key}${pIndex}${index}`}
                        pKey={`${key}${pIndex}${index}`}
                        openModal={() => setModalVisible(!modalVisible)}
                      />
                    ))}
                  </View>
                </ScrollView>
              );
            };

            return (
              <Tab.Screen name={key} component={TabComponent} key={pIndex} />
            );
          })}
        </Tab.Navigator>
      ) : (
        <Background>
          <Loader />
        </Background>
      )}
      <CustomModal
        title={""}
        toggleModal={() => setModalVisible(!modalVisible)}
        modalVisible={modalVisible}
        component={<ModalComponent />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    display: "flex",
    // alignSelf: "left",
    alignItems: "center",
    // justifyContent: "flex-start",
  },
  tabContainer: {
    alignItems: "center",
  },
  recommendations: {
    marginTop: 20,
  },
  customeButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
