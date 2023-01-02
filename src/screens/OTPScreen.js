import React, { useState } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { OTPValidator } from "../helpers/validators/otpValidator";
import { saveToLocal } from "../helpers/secureStore/index";
import { useSelector, useDispatch } from "react-redux";
import { updateUsername } from "../store/actions/user";
import axios from "axios";

export default function OTPScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [otp, setOtp] = useState({ value: "", error: "" });

  console.log(user);

  const onVerifyOTP = () => {
    const otpError = OTPValidator(otp.value);
    if (otpError) {
      setOtp({ ...otp, error: otpError });
      return;
    }
    if (otp.value == "1234") {
      navigation.reset({
        index: 0,
        routes: [{ name: "ProfileForm" }],
      });
    } else {
      setOtp({ ...otp, error: "OTP is 1234" });
    }
  };

  return (
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Logo />
      <Header>Welcome</Header>

      <TextInput
        label="OTP"
        returnKeyType="next"
        value={otp.value}
        onChangeText={(text) => {
          setOtp({ value: text.replace(/[^0-9]/g, ""), error: "" });
        }}
        error={!!otp.error}
        errorText={otp.error}
        textContentType="oneTimeCode"
        keyboardType="number-pad"
        maxLength={4}
        type="number"
      />

      <Button mode="contained" onPress={onVerifyOTP}>
        Verify OTP
      </Button>
    </Background>
  );
}
