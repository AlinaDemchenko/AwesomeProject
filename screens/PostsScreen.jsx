import { View, StyleSheet, ScrollView } from "react-native";
import Post from "../components/Post";
import { useSelector } from "react-redux";

function PostsScreen() {
  const posts = useSelector((state) => state.posts);

  return (
    <ScrollView style={styles.postsContainer}>
      {posts?.length > 0 && posts.map((post) => (
        <Post post={post} key={post.id}/>
      ))}
    </ScrollView>
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
