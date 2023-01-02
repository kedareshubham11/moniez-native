import { Text } from "react-native-paper";
import { LineChart, PieChart } from "react-native-chart-kit";
import { Dimensions, View } from "react-native";
import Background from "../Background";
import Header from "../Header";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
const screenWidth = Dimensions.get("window").width;

const colors = [
  "#011B08",
  "#034A17",
  "#057324",
  "#0CAC39",
  "#12D449",
  "#14FC55",
];

export default function Tab() {
  const userData = useSelector((state) => state.userData.data);
  const [lineChart, setLineChart] = useState({ label: [], data: [] });
  const [pieChart, setPieChart] = useState([]);

  useEffect(() => {
    getLineGraphData();
    getPieChartData();
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
  const pieChartData = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Beijing",
      population: 527612,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  const getLineGraphData = () => {
    const data = JSON.stringify({
      tracking_id: userData.tracking_id,
      reference_id: userData.refrence_id,
    });

    const config = {
      method: "post",
      url: "http://127.0.0.1:8000/debitavg",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        const data = {
          label: response.data.data.month,
          data: response.data.data.avg_debit_amount,
        };
        setLineChart(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getPieChartData = () => {
    const data = JSON.stringify({
      tracking_id: userData.tracking_id,
      reference_id: userData.refrence_id,
    });

    const config = {
      method: "post",
      url: "http://127.0.0.1:8000/categorywise",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        const data = mapPieChartData(response.data);
        setPieChart(data);
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

      {pieChart !== [] && (
        <View style={{ marginTop: 20, display: "flex", alignItems: "center" }}>
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

          <Header>Pie Chart</Header>
        </View>
      )}
    </Background>
  );
}
