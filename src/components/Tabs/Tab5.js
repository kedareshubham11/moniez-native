import { LineChart } from "react-native-chart-kit";
import { Dimensions, View } from "react-native";
import Background from "../Background";
import Header from "../Header";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "../../helpers/axios/axios";
const screenWidth = Dimensions.get("window").width;

export default function Tab() {
  const userData = useSelector((state) => state.userData.data);
  const [lineChart, setLineChart] = useState({ label: [], data: [] });

  useEffect(() => {
    getLineGraphData();
  }, []);
  const data = {
    labels: lineChart.label,
    datasets: [
      {
        data: lineChart.data,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Average Debit"], // optional
  };

  const getLineGraphData = () => {
    const payload = {
      tracking_id: userData.tracking_id,
      reference_id: userData.refrence_id,
    };

    axios
      .post("/eodmonthbalance", payload)
      .then(function (response) {
        console.log(response.data);
        const data = {
          label: response.data.data.month,
          data: response.data.data.eod_balance_values,
        };
        setLineChart(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Background>
      <Header>Analytics</Header>
      {lineChart !== { label: [], data: [] } && (
        <View style={{ display: "flex", alignItems: "center" }}>
          <LineChart
            data={data}
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundColor: "#000000",
              backgroundGradientFrom: "#000000",
              backgroundGradientTo: "#000000",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(  255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
          />
          <Header>Line Chart</Header>
        </View>
      )}
    </Background>
  );
}
