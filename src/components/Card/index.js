import { Image, StyleSheet, View, Linking } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "../../core/theme";
import Button from "../Button";
import { formatKey } from "../../helpers/formators";

export default function Card({ item, pKey, openModal }) {
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
            return "";
          }
        })}
      </View>

      <Button mode="outlined" onPress={() => openModal()}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            textTransform: "uppercase",
          }}
        >
          Invest With
        </Text>
        <Image
          source={require("../../assets/bob.webp")}
          style={{ height: 30, width: 30, marginLeft: 10 }}
        />
      </Button>
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
    justifyContent: "space-evenly",
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
  customeButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
