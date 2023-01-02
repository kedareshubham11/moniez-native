export function phoneValidator(phoneNo) {
  if (!phoneNo) return "Phone No can't be empty.";
  if (phoneNo.length !== 10) return "Invalid Phone No";
  return "";
}
