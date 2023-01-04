import React from "react";
import { Image, StyleSheet, Modal, View } from "react-native";
import { Text } from "react-native-paper";
import Button from "./Button";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "../core/theme";

export default function CustomModal({
  title,
  modalVisible,
  toggleModal,
  component,
  ...props
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        toggleModal(!modalVisible);
      }}
      {...props}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>{title}</Text>
            <Button
              style={styles.buttonClose}
              onPress={() => toggleModal(!modalVisible)}
            >
              <AntDesign
                name="closecircle"
                size={24}
                color={theme.colors.secondary}
              />
            </Button>
          </View>
          {component}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    color: theme.colors.primary,
    backgroundColor: "#292929",
    borderColor: theme.colors.secondary,
    borderWidth: 2,
  },
  headerView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 0.9,
    textAlign: "center",
  },
  buttonClose: {
    flex: 0.1,
    backgroundColor: "transparent",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
