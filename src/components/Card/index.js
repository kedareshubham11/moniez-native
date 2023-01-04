import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "../../core/theme";
import Button from "../Button";
export default function Card({ item, pKey }) {
  const formatKey = (key) => {
    if (key.includes("one_year")) {
      return removeUnderScore(key.replace("one_year", "1Y"));
    } else if (key.includes("three_year")) {
      return removeUnderScore(key.replace("three_year", "3Y"));
    } else if (key.includes("five_year")) {
      return removeUnderScore(key.replace("five_year", "5Y"));
    } else {
      return removeUnderScore(key);
    }
  };

  const removeUnderScore = (name) => {
    return name ? name.replaceAll("_", " ") : "";
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{item?.name}</Text>
      </View>

      <View style={styles.descContainer}>
        {Object.entries(item).map(([key, value], index) => {
          if (key !== "name" && key !== "risk") {
            return (
              <View style={styles.descItem} key={`${pKey}${index}`}>
                <Text styles={styles.text}>{formatKey(key)}</Text>
                <Text styles={styles.text}>{value}</Text>
              </View>
            );
          } else {
            return <></>;
          }
        })}
        <Button mode="outlined" onPress={() => alert("Invest Now")}>
          Invest
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1B1B1B",
    display: "flex",
    margin: 5,
    padding: 10,
    borderRadius: 7,
    width: 250,
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
