import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import SVGLogout from "../assets/images/log-out.svg";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/userReducer";
import { clearPosts } from "../redux/contentReducer";

function Home({ navigation }) {
  const Tabs = createBottomTabNavigator();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signIn(null));
    dispatch(clearPosts())
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createPostsScreenOptions = {
    tabBarIcon: ({ focused }) => (
      <View
        style={[
          styles.tabBarIcon,
          { backgroundColor: focused ? "#FF6C00" : "#fff" },
        ]}
      >
        <AntDesign
          name="plus"
          size={24}
          color={focused ? "#fff" : "#212121cc"}
        />
      </View>
    ),
    title: "Створити публікацію",
    headerStyle: styles.headerStyle,
    headerTintColor: "#212121",
    headerTitleStyle: styles.headerTitleStyle,
    headerTitleAlign: "center",
    tabBarStyle: { display: "none" },
    headerLeft: () => (
      <TouchableOpacity
        style={{ marginLeft: 16 }}
        onPress={() => navigation.navigate("Posts")}
      >
        <AntDesign name="arrowleft" size={24} color="#212121cc" />
      </TouchableOpacity>
    ),
  };

  const postsScreenOptions = {
    tabBarIcon: ({ focused }) => (
      <View
        style={[
          styles.tabBarIcon,
          { backgroundColor: focused ? "#FF6C00" : "#fff" },
        ]}
      >
        <Feather name="grid" size={24} color={focused ? "#fff" : "#212121cc"} />
      </View>
    ),
    title: "Публікації",
    headerStyle: styles.headerStyle,
    headerTintColor: "#212121",
    headerTitleStyle: styles.headerTitleStyle,
    headerTitleAlign: "center",
    headerRight: () => (
      <TouchableOpacity style={{ marginRight: 16 }} onPress={handleSignOut}>
        <SVGLogout width={24} height={24} />
      </TouchableOpacity>
    ),
  };

  const profileScreenOptions = {
    headerShown: false,
    tabBarIcon: ({ focused }) => (
      <View
        style={[
          styles.tabBarIcon,
          { backgroundColor: focused ? "#FF6C00" : "#fff" },
        ]}
      >
        <AntDesign
          name="user"
          size={24}
          color={focused ? "#fff" : "#212121cc"}
        />
      </View>
    ),
  };

  // function getHeaderTitle(route) {
  //   const routeName = getFocusedRouteNameFromRoute(route) ?? "Posts";

  return (
    <Tabs.Navigator
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 83,
          justifyContent: "center",
          paddingTop: 9,
          alignItems: "flex-start",
          paddingHorizontal: 89,
          },
      })}
      backBehavior="none"
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={postsScreenOptions}
      />
      <Tabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={createPostsScreenOptions}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={profileScreenOptions}
      />
    </Tabs.Navigator>
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
  tabBarIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
  },
});

export default Home;
