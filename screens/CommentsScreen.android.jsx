import Comment from "../components/Comment";
import SendButton from "../components/SendButton";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../redux/contentReducer";
import { getCurrentDate } from "../utils/date";
import { addCommentToFirestore } from "../firebase/firebase-utils";
import { AntDesign } from "@expo/vector-icons";

function CommentsScreen() {
  const [comment, setComment] = useState(null);
  const [currentComments, setCurrentComments] = useState([]);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const userId = useSelector((state) => state.authentication.user.token);
  const avatar = useSelector((state) => state.authentication.user.photoURL);
  const allComments = useSelector((state) => state.content.comments);

  const statusBarHeight = StatusBar.currentHeight;

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const route = useRoute();
  const { post } = route.params;

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
      }
    );
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const getCurrentComments = () => {
    const currentPostComments = allComments.filter(
      (comment) => comment.postId === post.id
    );
    setCurrentComments(currentPostComments);
  };

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
    getCurrentComments();
    setComment(null);
  };

  return (
    <>
      <View
        style={[
          styles.header,
          {
            top: keyboardHeight > 0 ? keyboardHeight - statusBarHeight + 10 : 0,
          },
          { height: 44 + statusBarHeight },
        ]}
      >
        <TouchableOpacity
          style={{ position: 'absolute', left: 16, bottom: 11,  zIndex: 3}}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="#212121cc" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Коментарі</Text>
      </View>
      <View
        style={[styles.commentContainer, { paddingTop: 76 + statusBarHeight }]}
      >
        <View style={styles.photoBlock}>
          <Image
            source={{ uri: post.photo }}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <ScrollView style={{ flex: 1, width: "100%" }}>
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
    </>
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
  headerTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    letterSpacing: -0.408,
    color: "#212121",
    textAlign: "center",
  },
  header: {
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, 0.30)",
    width: "100%",
    position: "absolute",
    zIndex: 2,
    paddingBottom: 11,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "flex-end",
  },
});

export default CommentsScreen;
