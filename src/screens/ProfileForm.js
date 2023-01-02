import React, { useState } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import DropDown from "react-native-paper-dropdown";
import { Surface, Text } from "react-native-paper";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../store/actions/profile";
import { emailValidator } from "../helpers/validators/emailValidator";
import { nameValidator } from "../helpers/validators/nameValidator";

export default function ProfileForm({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [riskAppetite, setRiskAppetite] = useState({ value: 0.33, error: "" });
  const [showDropDown, setShowDropDown] = useState(false);
  // console.log(riskAppetite);

  const riskList = [
    {
      label: "Low",
      value: 0.33,
    },
    {
      label: "Medium",
      value: 0.67,
    },
    {
      label: "High",
      value: 0.9,
    },
  ];

  const onSubmit = () => {
    const emailError = emailValidator(email.value);
    const nameError = nameValidator(name.value);

    if (!emailError && !nameError) {
      dispatch(
        updateProfile({
          name: name.value,
          email: email.value,
          riskAppetite: riskAppetite.value,
        })
      );

      navigation.reset({
        index: 0,
        routes: [{ name: "Consent" }],
      });
    }

    if (nameError) {
      setName({ ...name, error: nameError });
    }
    if (emailError) {
      setEmail({ ...email, error: emailError });
    }
  };

  return (
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <View style={styles.header}>
        <Header>Welcome to Moniez</Header>
        <Logo />
        <Text>Please fill in your details</Text>
      </View>

      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => {
          setName({ value: text, error: "" });
        }}
        error={!!name.error}
        errorText={name.error}
        textContentType="name"
        keyboardType="default"
        maxLength={25}
      />

      <TextInput
        label="email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => {
          setEmail({ value: text, error: "" });
        }}
        error={!!email.error}
        errorText={email.error}
        textContentType="email"
        keyboardType="default"
      />

      <Surface style={styles.containerStyle}>
        <SafeAreaView style={styles.safeContainerStyle}>
          <DropDown
            label={"Risk Appetite"}
            mode={"outlined"}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={riskAppetite.value}
            setValue={(value) => setRiskAppetite({ value: value, error: "" })}
            list={riskList}
          />
        </SafeAreaView>
      </Surface>

      {/* <TextInput
        label="Savings Per Month"
        returnKeyType="next"
        value={savings.value}
        onChangeText={(text) => {
          setSavings({ value: text, error: "" });
        }}
        error={!!savings.error}
        errorText={savings.error}
        textContentType="number"
        keyboardType="number"
      /> */}

      <Button mode="contained" onPress={onSubmit}>
        Submit
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    display: "flex",
    alignItems: "center",
  },
  containerStyle: {
    width: "100%",
    flex: 1,
    backgroundColor: "#000",
  },
  safeContainerStyle: {
    height: 20,
    width: "100%",
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "flex-start",
  },
});
