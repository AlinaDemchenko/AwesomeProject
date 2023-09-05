import { StatusBar } from "expo-status-bar";
import { useFonts } from 'expo-font';
import { StyleSheet} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler';
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import Home from "./screens/Home";

export default function App() {
  const MainStack = createStackNavigator(); 
  const [fontsLoaded] = useFonts({
    'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <NavigationContainer>
    <MainStack.Navigator initialRouteName="Login">
      <MainStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
      <MainStack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }}/>
      <MainStack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
    </MainStack.Navigator>
    <StatusBar style="auto" />
  </NavigationContainer>
  );
}


