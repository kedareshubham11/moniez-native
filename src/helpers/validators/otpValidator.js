export function OTPValidator(otp) {
  if (!otp) return "OTP can't be empty.";
  if (otp.length !== 4) return "OTP must container 4 numbers.";
  return "";
}
