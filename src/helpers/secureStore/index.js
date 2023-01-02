import * as SecureStore from "expo-secure-store";

export async function saveToLocal(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export async function getLocalValue(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    // alert(`values stored under that key. ${result}`);
    return result;
  } else {
    // alert(`No values stored under that key. ${result}`);
    return null;
  }
}
