import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Platform, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import "react-native-gesture-handler";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import Home from "./screens/Home";
import MapScreen from "./screens/MapScreen";
import CommentsScreen from "./screens/CommentsScreen";

export default function App() {
  const MainStack = createStackNavigator();
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainStack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerBackTitleVisible: false,
            }}
          >
            <MainStack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Map"
              component={MapScreen}
              options={{
                title: "Мапа",
                headerStyle: styles.headerStyle,
                headerTintColor: "#212121",
                headerTitleStyle: styles.headerTitleStyle,
                headerTitleAlign: "center",
              }}
            />
            <MainStack.Screen
              name="Comments"
              component={CommentsScreen}
              options={{
                headerShown: Platform.OS === "ios" ? true : false,
                title: "Коментарі",
                headerStyle: styles.headerStyle,
                headerTintColor: "#212121",
                headerTitleStyle: styles.headerTitleStyle,
                headerTitleAlign: "center",
              }}
            />
          </MainStack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export const styles = StyleSheet.create({
  headerTitleStyle: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    letterSpacing: -0.408,
  },
  headerStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, 0.30)",
  },
});
