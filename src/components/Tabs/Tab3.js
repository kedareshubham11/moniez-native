import { Dimensions, View, ScrollView, StyleSheet } from "react-native";
import Background from "../Background";
import Header from "../Header";
import Card from "../Card";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../helpers/axios/axios";
import Title from "../Title";
export default function Tab() {
  const storeData = useSelector((state) => state);
  const userData = storeData.userData.data;
  const riskAppetite = storeData.profile.data.riskAppetite;
  const [recommendations, setRecommendations] = useState({
    data: {},
    loader: true,
  });

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

  return (
    <ScrollView>
      <Background>
        <View style={styles.container}>
          <Header>Recommendations For You</Header>
          <View style={styles.recommendations}>
            {!recommendations.loader &&
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
                          />
                        ))}
                      </ScrollView>
                    </View>
                  );
                }
              )}
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
    // justifyContent: "flex-start",
  },
  recommendations: {
    marginTop: 20,
  },
});
