import { StatusBar } from "expo-status-bar";
import { useFonts } from 'expo-font';
import { StyleSheet, View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import PostsScreen from "./screens/PostsScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
<LoginScreen/>
        {/* <RegistrationScreen/> */}
        {/* <PostsScreen/> */}
         </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
