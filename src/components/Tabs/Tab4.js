import { Text } from "react-native-paper";
import { Dimensions, View, ScrollView, StyleSheet } from "react-native";
import Background from "../Background";
import Header from "../Header";
import HeaderBar from "../HeaderBar";
import Card from "../Card";
import Paragraph from "../Paragraph";
import Button from "../Button";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { updateAAData } from "../../store/actions/aa";

export default function Tab({ navigation }) {
  const dispatch = useDispatch();
  const phoneNo = useSelector((state) => state.user.username);
  const profilData = useSelector((state) => state.profile.data);
  const onSubmit = () => {
    dispatch(updateAAData({}));
    navigation.reset({
      index: 0,
      routes: [{ name: "SplashScreen" }],
    });
  };

  return (
    <Background styles={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <FontAwesome name="user-circle" size={24} color="white" />
          <Text style={styles.headTitle}>Profile</Text>
        </View>

        <View style={styles.textCard}>
          <Text style={styles.title}>Name</Text>
          <Text style={{ ...styles.text, textTransform: "capitalize" }}>
            {" "}
            {profilData.name}
          </Text>
          <Text style={styles.underline}></Text>
        </View>
        <View style={styles.textCard}>
          <Text style={styles.title}>Phone Number</Text>
          <Text style={styles.text}> {phoneNo}</Text>
          <Text style={styles.underline}></Text>
        </View>
        <View style={styles.textCard}>
          <Text style={styles.title}>Email</Text>
          <Text style={styles.text}> {profilData.email}</Text>
          <Text style={styles.underline}></Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button mode="outlined" onPress={onSubmit}>
            Logout
          </Button>
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
  },
  textCard: {
    width: "100%",
    marginVertical: 10,
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
    fontSize: 18,
    marginVertical: 6,
    paddingVertical: 2,
  },
  text: {
    fontSize: 16,
    marginVertical: 4,
    paddingVertical: 2,
  },
  underline: {
    marginTop: 10,
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
