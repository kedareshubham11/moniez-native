import { Dimensions, View, ScrollView, StyleSheet, Modal } from "react-native";
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

  const onPressTrade = () => {
    alert("trade");
  };

  const onPressCreate = () => {
    alert("Create");
  };

  const ModalCoponent = () => {
    return (
      <View>
        <Button onPress={onPressTrade}> Trade </Button>
        <Button onPress={onPressCreate}> Create</Button>
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
          <Header>Explore</Header>
        </Background>
      )}
      <CustomModal
        title={"Invest With BOB"}
        toggleModal={() => setModalVisible(!modalVisible)}
        modalVisible={modalVisible}
        component={<ModalCoponent />}
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
});
