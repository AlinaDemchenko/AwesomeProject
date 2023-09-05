import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import SVGLogout from "../assets/images/log-out.svg";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";

function Home({ navigation, route }) {
  const Tabs = createBottomTabNavigator();

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
        <Feather
          name="grid"
          size={24}
          color={focused ? "#fff" : "#212121cc"}
        />
      </View>
    ),
    title: "Публікації",
    headerStyle: styles.headerStyle,
    headerTintColor: "#212121",
    headerTitleStyle: styles.headerTitleStyle,
    headerTitleAlign: "center",
    headerRight: () => (
      <TouchableOpacity
        style={{ marginRight: 16 }}
        onPress={() => navigation.navigate("Login")}
      >
        <SVGLogout width={24} height={24} />
      </TouchableOpacity>
    ),
  }

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
  }

  function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Posts";

    if (routeName === "Profile" ) {
      return (
        <>
          <Tabs.Screen
            name="Posts"
            component={PostsScreen}
            options={postsScreenOptions}
          />
          <Tabs.Screen
            name="Profile"
            component={ProfileScreen}
            options={profileScreenOptions}
          />
          <Tabs.Screen
            name="CreatePosts"
            component={CreatePostsScreen}
            options={createPostsScreenOptions}
          />
        </>
      )} else {
        return (
          <>
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
          </>
        )}
    }

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 83,
          justifyContent: "center",
          alignItems: "center",
        },
      })}
      backBehavior="none"
    >
      {getHeaderTitle(route)}
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
