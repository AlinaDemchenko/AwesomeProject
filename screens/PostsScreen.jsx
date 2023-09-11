import { StyleSheet, ScrollView, View, Image, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { collection, getDocs } from "firebase/firestore";
import { getPosts } from "../redux/contentReducer";
import { useEffect } from "react";
import { db } from "../firebase/firebase-config";

function PostsScreen() {
  const posts = useSelector((state) => state.content.posts);
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();
  const avatar = user ? user.photoURL : null;
  const login = user ? user.displayName : null;
  const email = user ? user.email : null;

  useEffect(() => {
    (async () => {
      const snapshot = await getDocs(collection(db, "Posts"));
      const allPosts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      dispatch(getPosts(allPosts))
    })();
  }, []);


  return (
    <ScrollView style={styles.postsContainer}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          marginBottom: 32,
          height: 60,
        }}
      >
        {avatar ? (
          <Image style={styles.userImage} source={{ uri: avatar }} />
        ) : (
          <View style={styles.userImage}></View>
        )}
        <View
          style={{ height: "100%", display: "flex", justifyContent: "center" }}
        >
          <Text style={styles.login}>{login}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      {posts?.length > 0 &&
        posts.map((post) => <Post post={post} key={post.id} />)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  email: {
    color: "rgba(33, 33, 33, 0.80)",
    fontFamily: "Roboto",
    fontSize: 11,
  },
  login: {
    color: "#212121",
    fontFamily: "Roboto-Bold",
    fontSize: 13,
  },
  postsContainer: {
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
  userImage: {
    width: 60,
    height: 60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    marginRight: 8,
  },
});

export default PostsScreen;
