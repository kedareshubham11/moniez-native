import {
  Dimensions,
  View,
  ScrollView,
  StyleSheet,
  Image,
  Linking,
} from "react-native";
import Background from "../Background";
import Header from "../Header";
import Card from "../Card";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../helpers/axios/axios";
import Title from "../Title";
import { Text } from "react-native-paper";
import Button from "../Button";
import Modal from "../Modal";
import Loader from "../Loader";

export default function Tab() {
  const storeData = useSelector((state) => state);
  const userData = storeData.userData.data;
  const riskAppetite = storeData.profile.data.riskAppetite;
  const [recommendations, setRecommendations] = useState({
    data: {},
    loader: true,
  });
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getRecomendation();
  }, []);

  const getRecomendation = () => {
    const payload = {
      tracking_id: userData.tracking_id,
      reference_id: userData.refrence_id,
      risk_appetite_value: riskAppetite,
    };

    setRecommendations({ ...recommendations, loader: true });
    axios
      .post("/recommendations", payload)
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
          <Text style={styles.modalBtnText}>Open Demat</Text>
          <Image
            source={require("../../assets/bob.webp")}
            style={styles.modalBtnImg}
          />
        </Button>

        <Button mode="outlined" onPress={onPressTrade}>
          <Text style={styles.modalBtnText}>Invest With</Text>
          <Image
            source={require("../../assets/bob.webp")}
            style={styles.modalBtnImg}
          />
        </Button>
      </View>
    );
  };

  return (
    <ScrollView>
      <Background>
        <View style={styles.container}>
          <Header>Recommendations For You</Header>
          <View style={styles.recommendations}>
            {!recommendations.loader ? (
              Object.entries(recommendations.data).map(
                ([key, value], pIndex) => {
                  return (
                    <View key={pIndex} style={{ maxHeight: 320 }}>
                      <Title>{key}</Title>
                      <ScrollView horizontal={true}>
                        {value.map((item, index) => (
                          <Card
                            item={item}
                            key={`${key}${pIndex}${index}`}
                            pKey={`${key}${pIndex}${index}`}
                            openModal={() => setModalVisible(!modalVisible)}
                          />
                        ))}
                      </ScrollView>
                    </View>
                  );
                }
              )
            ) : (
              <Loader />
            )}
          </View>
        </View>

        <Modal
          title={""}
          toggleModal={setModalVisible}
          modalVisible={modalVisible}
          component={<ModalComponent />}
        />
      </Background>
    </ScrollView>
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
  recommendations: {
    marginTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  customButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  modalBtnText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  modalBtnImg: { height: 30, width: 30, marginLeft: 10 },
});
