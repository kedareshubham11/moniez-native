import { Text } from "react-native-paper";
import { LineChart, PieChart } from "react-native-chart-kit";
import { Dimensions, View } from "react-native";
import Background from "../Background";
import Header from "../Header";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "../../helpers/axios/axios";
const screenWidth = Dimensions.get("window").width;

const colors = [
  "#008631",
  "#00ab41",
  "#00c04b",
  "#1fd655",
  "#39e75f",
  "#5ced73",
];

export default function Tab() {
  const userData = useSelector((state) => state.userData.data);
  const [lineChart, setLineChart] = useState({
    label: [],
    data: [],
    loader: true,
  });
  const [pieChart, setPieChart] = useState([]);
  const [loadingPieChart, setLoadingPieChart] = useState(false);

  useEffect(() => {
    getLineGraphData();
    getPieChartData();
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
    legend: ["Average Debit"],
  };

  const mapPieChartData = (obj) => {
    return Object.entries(obj).map(([key, value], index) => {
      return {
        name: key,
        population: value,
        color: colors[index],
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      };
    });
  };

  const getLineGraphData = () => {
    const payload = {
      tracking_id: userData.tracking_id,
      reference_id: userData.refrence_id,
    };

    axios
      .post("/debitavg", payload)
      .then(function (response) {
        const data = {
          label: response.data.data.month,
          data: response.data.data.avg_debit_amount,
          loader: false,
        };
        setLineChart(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getPieChartData = () => {
    const payload = {
      tracking_id: userData.tracking_id,
      reference_id: userData.refrence_id,
    };

    axios
      .post("/categorywise", payload)
      .then(function (response) {
        const data = mapPieChartData(response.data);
        setPieChart(data);
        setLoadingPieChart(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Background>
      <Header>Analytics</Header>
      {!lineChart?.loader && (
        <View style={{ display: "flex", alignItems: "center", marginTop: 30 }}>
          <Header style={{ colors: "#555555", fontSize: 18 }}>
            Monthly Spends
          </Header>
          <LineChart
            data={data}
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundColor: "#121212",
              backgroundGradientFrom: "#121212",
              backgroundGradientTo: "#121212",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(  255, 255, 255, ${opacity})`,
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
        </View>
      )}

      {loadingPieChart && (
        <View style={{ marginTop: 20, display: "flex", alignItems: "center" }}>
          <Header style={{ colors: "#555555", fontSize: 18 }}>
            Category Wise Analysis
          </Header>
          <PieChart
            data={pieChart}
            width={Dimensions.get("window").width - 16}
            height={220}
            chartConfig={{
              backgroundColor: "#1cc910",
              backgroundGradientFrom: "#eff3ff",
              backgroundGradientTo: "#efefef",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute //for the absolut
          />
        </View>
      )}
    </Background>
  );
}
