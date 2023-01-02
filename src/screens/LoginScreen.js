import React, { useState } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { phoneValidator } from "../helpers/validators/phoneValidator";
import { useSelector, useDispatch } from "react-redux";
import { updateUsername } from "../store/actions/user";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [phoneNo, setPhoneNo] = useState({ value: "", error: "" });

  const onLoginPressed = () => {
    const phoneError = phoneValidator(phoneNo.value);
    if (phoneError) {
      setPhoneNo({ ...phoneNo, error: phoneError });
      return;
    }
    dispatch(updateUsername(phoneNo.value));
    navigation.reset({
      index: 0,
      routes: [{ name: "OTPScreen" }],
    });
  };

  return (
    <Background>
      <Logo />
      <Header>MONIEZ</Header>
      <TextInput
        label="Phone No"
        returnKeyType="next"
        value={phoneNo.value}
        onChangeText={(text) =>
          setPhoneNo({ value: text.replace(/[^0-9]/g, ""), error: "" })
        }
        error={!!phoneNo.error}
        errorText={phoneNo.error}
        autoCapitalize="tel"
        autoCompleteType="phone"
        textContentType="telephoneNumber"
        keyboardType="number-pad"
        maxLength={10}
      />

      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
    </Background>
  );
}
