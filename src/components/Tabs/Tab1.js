import { LineChart } from "react-native-chart-kit";
import { Dimensions, StyleSheet, View } from "react-native";
import Background from "../Background";
import Header from "../Header";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "../../helpers/axios/axios";
import Investments from "../Investments";
import { Text } from "react-native-paper";
import Button from "../Button";
import { useNavigation } from "@react-navigation/native";
const screenWidth = Dimensions.get("window").width;

export default function Tab() {
  const storeData = useSelector((state) => state);
  const userData = storeData.userData.data;
  const profile = storeData.profile.data;
  const navigation = useNavigation();

  const [lineChart, setLineChart] = useState({
    label: [],
    data: [],
    loading: false,
  });
  const [profileData, setProfileData] = useState(null);
  const [totalInvestments, setTotalInvestments] = useState({});

  useEffect(() => {
    getLineGraphData();
    getProfileData();
    getTotalInvestments();
  }, []);
  const data = {
    labels: lineChart.label,
    datasets: [
      {
        data: lineChart.data,
        color: (opacity = 1) => `#09C729`,
        strokeWidth: 2,
      },
    ],
    legend: ["EOD balance per month"],
  };

  const getLineGraphData = () => {
    const payload = {
      tracking_id: userData.tracking_id,
      reference_id: userData.refrence_id,
    };

    axios
      .post("/eodmonthbalance", payload)
      .then(function (response) {
        const data = {
          label: response.data.data.months,
          data: response.data.data.eod_balance_values,
          loading: true,
        };
        setLineChart(data);
      })
      .catch(function (error) {
        console.log(error);
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
        const data = response.data.data;
        setProfileData(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getTotalInvestments = () => {
    const payload = {
      tracking_id: userData.tracking_id,
      reference_id: userData.refrence_id,
    };

    axios
      .post("/currentinvestment", payload)
      .then((response) => {
        const data = response.data;
        setTotalInvestments(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const lineChartCTA = "Create Wealth";

  return (
    <Background>
      <View style={styles.header}>
        <Text style={styles.greetings}>Hello {profileData?.data[0].name}</Text>
        <Text>Account Balance: ₹{profileData?.data[0]?.bank_balance}</Text>
        <Text>Account No: {profileData?.data[0]?.bank_account}</Text>
      </View>
      {/* <Header style={styles.subtitle}>Wealth Management</Header> */}
      {lineChart?.loading && (
        <View style={{ display: "flex", alignItems: "center" }}>
          {/* navigation */}
          <Button onPress={() => navigation.navigate("Dashboard")}>
            {lineChartCTA}
          </Button>
          <LineChart
            data={data}
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundColor: "#121212",
              backgroundGradientFrom: "#121212",
              backgroundGradientTo: "#121212",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba( 255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffffff",
              },
            }}
          />
          {/* <Header>Line Chart</Header> */}
        </View>
      )}

      <Investments investments={totalInvestments} />
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
    height: 2,
    width: "100%",
    backgroundColor: "#cecece",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "140%",
    marginVertical: 8,
    paddingVertical: 10,
  },
  buttonContainer: {
    margin: 20,
    width: "100%",
  },
  greetings: {
    fontSize: 22,
    fontWeight: "600",
    padding: 5,
    textTransform: "uppercase",
  },
  accountContainer: {
    fontSize: 18,
    fontWeight: "600",
    // position: "absolute",
    // top: 10,
    // left: 0,
  },
  underline: {
    marginTop: 6,
    height: 1,
    backgroundColor: "#cecece",
  },
  subtitle: {
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: "400",
  },
});
