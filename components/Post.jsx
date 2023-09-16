import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import SVGcomment from "../assets/images/message-circle.svg";
import SVGlocation from "../assets/images/map-pin.svg";
import SVGcommentFull from "../assets/images/message.svg"

const Post = ({ post }) => {
  const navigation = useNavigation();
  const allComments = useSelector((state) => state.content.comments);
  const currentPostComments = allComments.filter(
    (comment) => comment.postId === post.id
  );
  return (
    <View style={styles.postContainer}>
      <View style={styles.photoBlock}>
        <Image
          source={{ uri: post.photo }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <Text style={styles.postText}>{post.name}</Text>
      <View style={[styles.postDetails, { justifyContent: "space-between" }]}>
        <Pressable
          style={styles.postDetails}
          onPress={() =>
            navigation.navigate("Comments", {
              post,
            })
          }
        >
          {currentPostComments.length > 0 ? 
           <SVGcommentFull width={24} height={24} style={{ marginRight: 6 }} /> :
          <SVGcomment width={24} height={24} style={{ marginRight: 6 }} />}
          <Text
            style={{ color: currentPostComments.length > 0 ? "#212121" : "#BDBDBD", fontFamily: "Roboto", fontSize: 16 }}
          >
            {currentPostComments ? currentPostComments.length : 0}
          </Text>
        </Pressable>
        <Pressable
          style={styles.postDetails}
          onPress={() => navigation.navigate("Map", { post: post })}
        >
          <SVGlocation width={24} height={24} style={{ marginRight: 4 }} />
          <Text
            style={{
              color: "#212121",
              fontFamily: "Roboto",
              fontSize: 16,
              textDecorationLine: "underline",
            }}
          >
            {post.address}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    height: 299,
    width: "100%",
    marginBottom: 34,
  },
  photoBlock: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 8,
  },
  postText: {
    color: "#212121",
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
  },
  postDetails: {
    display: "flex",
    flexDirection: "row",
  },
});

export default Post;
