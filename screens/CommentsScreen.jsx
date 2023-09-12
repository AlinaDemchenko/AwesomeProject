import Comment from "../components/Comment";
import SendButton from "../components/SendButton";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../redux/contentReducer";
import { getCurrentDate } from "../utils/date";

function CommentsScreen() {
  const [comment, setComment] = useState(null);
  const allComments = useSelector((state) => state.content.comments);
  const userId = useSelector((state) => state.authentication.user.token);
  const {
    params: { post },
  } = useRoute();
  const dispatch = useDispatch();

  const handleSend = async () => {
    const date = getCurrentDate();
    const newComment = { text: comment, date, userId };
    await dispatch(addComment(newComment));
    setComment(null);
  };

  return (
    <View style={styles.commentContainer}>
      <View style={styles.photoBlock}>
        <Image
          source={{ uri: post.photo }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <ScrollView style={{ height: "100%", width: "100%" }}>
        {allComments?.length > 0 &&
          allComments.map((commentData, idx) => (
            <Comment commentData={commentData} key={idx} />
          ))}
      </ScrollView>
      <View style={{ width: "100%", position: "relative" }}>
        <TextInput
          style={styles.input}
          maxLength={250}
          onChangeText={setComment}
          value={comment}
          placeholder="Коментувати..."
          placeholderTextColor="#BDBDBD"
        />
        <SendButton onSend={handleSend} disabled={!comment} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  photoBlock: {
    height: 240,
    width: "100%",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 32,
  },
  commentContainer: {
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  input: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
    paddingHorizontal: 16,
  },
});

export default CommentsScreen;
