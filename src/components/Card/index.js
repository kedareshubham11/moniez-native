import { Dimensions, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Header from "../Header";
import Paragraph from "../Paragraph";
import { theme } from "../../core/theme";
export default function Card({ item }) {
  const formatKey = (key) => {
    if (key.includes("one_year")) {
      return removeUnderScore(key.replace("one_year", "1Y"));
    } else if (key.includes("three_year")) {
      return removeUnderScore(key.replace("three_year", "3Y"));
    } else if (key.includes("five_year")) {
      return removeUnderScore(key.replace("five_year", "5y"));
    } else {
      return removeUnderScore(key);
    }
  };

  const removeUnderScore = (string) => {
    return string.replaceAll("_", " ");
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{item?.name}</Text>
      </View>

      <View style={styles.descContainer}>
        {Object.entries(item).map(([key, value], index) => {
          if (key !== "name") {
            return (
              <View style={styles.descItem} key={value}>
                <Text styles={styles.text}>{formatKey(key)}</Text>
                <Text styles={styles.text}>{value}</Text>
              </View>
            );
          } else {
            return <></>;
          }
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1B1A1A",
    display: "flex",
    margin: 5,
    padding: 5,
    borderRadius: 7,
    width: "90%",
  },
  title: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: "bold",
    paddingVertical: 12,
    textTransform: "capitalize",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  text: {
    fontSize: 15,
    padding: 3,
    textTransform: "capitalize",
  },
  descContainer: {
    padding: 5,
  },
  descItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 3,
  },
});
