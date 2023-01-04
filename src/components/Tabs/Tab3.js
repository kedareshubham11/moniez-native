import { Text } from "react-native-paper";
import { Dimensions, View, ScrollView, StyleSheet } from "react-native";
import Background from "../Background";
import Header from "../Header";
import Card from "../Card";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../helpers/axios/axios";
import Title from "../Title";
export default function Tab() {
  const storeData = useSelector((state) => state);
  const userData = storeData.userData.data;
  const riskAppetite = storeData.profile.data.riskAppetite;
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    getRecomendation();
  }, []);
  const stocks = {
    mutual_funds: [
      {
        name: "quant small cap fund direct growth",
        one_year_return: "10.2%",
        three_year_return: "55.2%",
        five_year_return: "23.49%",
        risk: "high",
        category: "equity",
      },
      {
        name: "Quant tax plan direct growth",
        one_year_return: "13%",
        three_year_return: "40.12%",
        five_year_return: "22.77%",
        risk: "high",
        category: "equity",
      },
      {
        name: "TATA small cap fund direct growth",
        one_year_return: "10.9%",
        three_year_return: "33.6%",
        five_year_return: "12.23%",
        risk: "high",
        category: "equity",
      },
      {
        name: "Kotak small cap fund direct growth",
        one_year_return: "0.55%",
        three_year_return: "32.59%",
        five_year_return: "15.63%",
        risk: "high",
        category: "equity",
      },
    ],
    stocks: [
      {
        name: "Apple Inc",
        current_price: "$130.12",
        one_month: "-10.72%",
        three_months: "-11,54%",
        one_year: "-29.74%",
        five_year: "197.91%",
      },
      {
        name: "Microsoft Corporation",
        current_price: "$241.16",
        one_month: "-2.41%",
        three_months: "-1.25%",
        one_year: "-31.41%",
        five_year: "174.18%",
      },
      {
        name: "Nvidia corporation",
        current_price: "$145.79",
        one_month: "-10.25%",
        three_months: "14.86%",
        one_year: "-53.21%",
        five_year: "190.15%",
      },
      {
        name: "Meta Platform Inc",
        current_price: "$120.67",
        one_month: "5.63%",
        three_months: "-15.24%",
        one_year: "-66.29%",
        five_year: "-34.48%",
      },
      {
        name: "Cisco System Inc",
        current_price: "$47.61",
        one_month: "-2.51%",
        three_months: "16.02%",
        one_year: "-26.41%",
        five_year: "22.9%",
      },
    ],
    crypto: [
      { name: "Bitcoin", price: "1439600", category: "large_cap" },
      { name: "Ethereum", price: "102831", category: "large_cap" },
      { name: "Binance coin", price: "21305", category: "large_cap" },
      { name: "Solana", price: "800.26", category: "large_cap" },
      { name: "Tether", price: "87.15", category: "large_cap" },
      { name: "Ripple", price: "30.3", category: "large_cap" },
      { name: "Cardano", price: "21.25", category: "large_cap" },
      { name: "Doge", price: "6.25", category: "large_cap" },
    ],
    bonds: [
      {
        name: "UTI Bond Fund Direct Growth",
        one_year_return: "10.28%",
        three_year_return: "7.19%",
        five_year_return: "-4.17%",
      },
      {
        name: "Nippon India Income Fund (Growth)",
        one_year_return: "-3.33%",
        three_year_return: "4.96%",
        five_year_return: "6.46%",
      },
      {
        name: "ICICI Prudential Long Term Bond Fund Direct Plan Growth",
        one_year_return: "-1.86%",
        three_year_return: "4.71%",
        five_year_return: "6.82%",
      },
      {
        name: "Tata Income Fund Direct Growth",
        one_year_return: "-0.50%",
        three_year_return: "5.97%",
        five_year_return: "-5.89%",
      },
      {
        name: "LIC MF Bond Fund Growth",
        one_year_return: "-2.85%",
        three_year_return: "4.26%",
        five_year_return: "5.26%",
      },
    ],
  };

  const getRecomendation = () => {
    const payload = {
      tracking_id: userData.tracking_id,
      reference_id: userData.refrence_id,
      risk_appetite_value: riskAppetite,
    };

    axios
      .post("/recommendations", payload)
      .then((response) => {
        const data = response.data.data;
        setRecommendations(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <ScrollView>
      <Background>
        <View style={styles.container}>
          <Header>Explore All Recommendations</Header>
          <View>
            {stocks.length != 0 &&
              Object.entries(stocks).map(([key, value], pIndex) => {
                return (
                  <>
                    <Title>{key}</Title>
                    <ScrollView horizontal={true}>
                      {value.map((item, index) => (
                        <Card
                          item={item}
                          key={`${key}${pIndex}${index}`}
                          pKey={`${key}${pIndex}${index}`}
                        />
                      ))}
                    </ScrollView>
                  </>
                );
              })}
          </View>
        </View>
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
    // justifyContent: "flex-start"
  },
});
