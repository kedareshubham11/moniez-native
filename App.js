import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { theme } from "./src/core/theme";
import { store, persistor } from "./src/store/state/store";
import {
  SplashScreen,
  LoginScreen,
  OTPScreen,
  Dashboard,
  ProfileForm,
  Consent,
  StartScreen,
} from "./src/screens";
const Stack = createStackNavigator();

export default function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Provider theme={theme}>
          <NavigationContainer theme={theme}>
            <Stack.Navigator
              initialRouteName="SplashScreen"
              screenOptions={{
                // headerShown: true,
                title: "Moniez",
                headerStyle: {
                  backgroundColor: "#09C729",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            >
              <Stack.Screen name="SplashScreen" component={SplashScreen} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="OTPScreen" component={OTPScreen} />
              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen name="ProfileForm" component={ProfileForm} />
              <Stack.Screen name="Consent" component={Consent} />
              <Stack.Screen name="StartScreen" component={StartScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </PersistGate>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
