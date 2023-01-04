import { Text } from "react-native-paper";
import { Dimensions, View, ScrollView, StyleSheet } from "react-native";
import Background from "../Background";
import Header from "../Header";
import HeaderBar from "../HeaderBar";
import Card from "../Card";
import Paragraph from "../Paragraph";
import Button from "../Button";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { updateAAData } from "../../store/actions/aa";
import axios from "../../helpers/axios/axios";
import { useEffect, useState } from "react";

export default function Tab({ navigation }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.data);
  // console.log(userData);
  const [profilData, setProfileData] = useState(null);
  // const phoneNo = storeData.user.username;
  // const profilData = useSelector((state) => state.profile.data);

  useEffect(() => {
    getProfileData();
  }, []);

  const onSubmit = () => {
    dispatch(updateAAData({}));
    navigation.reset({
      index: 0,
      routes: [{ name: "SplashScreen" }],
    });
  };

  const getProfileData = () => {
    const payload = {
      tracking_id: userData.tracking_id,
      reference_id: userData.refrence_id,
    };

    axios
      .post("/profile", payload)
      .then((response) => {
        const data = response.data.data.data[0];
        setProfileData(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Background styles={styles.container}>
      <ScrollView style={styles.viewContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <FontAwesome name="user-circle" size={24} color="white" />
            <Text style={styles.headTitle}>Profile</Text>
          </View>
          {profilData?.name && (
            <>
              <View style={styles.textCard}>
                <Text style={styles.title}>Name</Text>
                <Text style={styles.text}>{profilData?.name}</Text>
                <Text style={styles.underline}></Text>
              </View>
              <View style={styles.textCard}>
                <Text style={styles.title}>Phone Number</Text>
                <Text style={styles.text}> {profilData?.mobile}</Text>
                <Text style={styles.underline}></Text>
              </View>
              <View style={styles.textCard}>
                <Text style={styles.title}>Email</Text>
                <Text style={{ ...styles.text, textTransform: "lowercase" }}>
                  {" "}
                  {profilData?.email}
                </Text>
                <Text style={styles.underline}></Text>
              </View>
              <View style={styles.textCard}>
                <Text style={styles.title}>DOB</Text>
                <Text style={styles.text}> {profilData?.dob}</Text>
                <Text style={styles.underline}></Text>
              </View>
              <View style={styles.textCard}>
                <Text style={styles.title}>PAN</Text>
                <Text style={{ ...styles.text, textTransform: "uppercase" }}>
                  {profilData?.pan}
                </Text>
                <Text style={styles.underline}></Text>
              </View>

              <View style={styles.textCard}>
                <Text style={styles.title}>Bank Account</Text>
                <Text style={{ ...styles.text, textTransform: "lowercase" }}>
                  {profilData?.bank_account}
                </Text>
                <Text style={styles.underline}></Text>
              </View>

              <View style={styles.textCard}>
                <Text style={styles.title}>Bank Balance</Text>
                <Text style={{ ...styles.text, textTransform: "lowercase" }}>
                  {profilData?.bank_balance}
                </Text>
                <Text style={styles.underline}></Text>
              </View>

              <View style={styles.textCard}>
                <Text style={styles.title}>Address</Text>
                <Text style={styles.text}> {profilData?.address}</Text>
                <Text style={styles.underline}></Text>
              </View>
            </>
          )}
          <View style={styles.buttonContainer}>
            <Button mode="outlined" onPress={onSubmit}>
              Logout
            </Button>
          </View>
        </View>
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    width: "100%",
    display: "flex",
    // alignSelf: "center",
    // alignItems: "center",
  },
  container: {
    width: "100%",
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
  },
  textCard: {
    width: "100%",
    marginVertical: 6,
    paddingVertical: 2,
    margin: 10,
  },
  headTitle: {
    margin: 15,
    fontSize: 22,
    marginVertical: 6,
    paddingVertical: 2,
  },
  title: {
    fontSize: 16,
    marginVertical: 4,
    paddingVertical: 2,
  },
  text: {
    fontSize: 16,
    marginVertical: 3,
    paddingVertical: 2,
    textTransform: "capitalize",
    color: "#cecece",
  },
  underline: {
    marginTop: 6,
    height: 1,
    backgroundColor: "#cecece",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  buttonContainer: {
    margin: 20,
    width: "100%",
  },
});
