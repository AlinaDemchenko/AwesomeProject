import { View, Text, StyleSheet } from "react-native";
import Post from "../components/Post";

function PostsScreen() {
  return (
    <View style={styles.postsContainer}>
      <Post
        name="oleg"
        photo="https://24tv.ua/resources/photos/news/202306/2343286_16425282.jpg?v=1687956960000&w=1662&h=1078&fit=cover%27&output=webp"
        location="Kazantip, Ukraine"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  postsContainer: {
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
});

export default PostsScreen;
