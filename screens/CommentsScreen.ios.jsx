import Comment from "../components/Comment";
import SendButton from "../components/SendButton";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, TextInput, View} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../redux/contentReducer";
import { getCurrentDate } from "../utils/date";
import { addCommentToFirestore } from "../firebase/firebase-utils";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function CommentsScreen() {
  const [comment, setComment] = useState(null);
  const [currentComments, setCurrentComments] = useState([]);
  const userId = useSelector((state) => state.authentication.user.token);
  const avatar = useSelector((state) => state.authentication.user.photoURL);
  const allComments = useSelector((state) => state.content.comments);
  const dispatch = useDispatch();
  const route = useRoute();
  const { post } = route.params;

  const getCurrentComments = () => {
    const currentPostComments = allComments.filter(
      (comment) => comment.postId === post.id
      );
    setCurrentComments(currentPostComments)};

  useEffect(() => {
    if (allComments?.length > 0) {
      getCurrentComments();
    }
  }, [allComments]);

  const handleSend = async () => {
    const date = getCurrentDate();
    const newComment = { text: comment, date, userId };
    await addCommentToFirestore({ ...newComment, postId: post.id, avatar });
    await dispatch(addComment({ ...newComment, postId: post.id, avatar }));
    getCurrentComments()
    setComment(null);
  };

  return (
    <KeyboardAwareScrollView
    contentContainerStyle={{ flex: 1 }}
    extraScrollHeight={50}
    enableOnAndroid={false}
    enableAutomaticScroll={true}
    keyboardOpeningTime={0}
    viewIsInsideTabBar={true}
  >
    <View style={styles.commentContainer}>
      <View style={styles.photoBlock}>
        <Image
          source={{ uri: post.photo }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <ScrollView style={{flex: 1, width: "100%" }}>
        {currentComments?.length > 0 &&
          currentComments.map((commentData) => (
            <Comment commentData={commentData} key={commentData.id} />
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
    </KeyboardAwareScrollView>
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
    // flex: 1,
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