import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import SVGcomment from "../assets/images/message-circle.svg";
import SVGlocation from "../assets/images/map-pin.svg";
import { useNavigation } from "@react-navigation/native";

const Post = ({ photo, name, comments, location }) => {
    const navigation = useNavigation();
  return (
    <View>
      <View style={styles.photoBlock}>
        <Image
          source={{ uri: photo }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <Text style={styles.postText}>{name}</Text>
      <View style={[styles.postDetails, {justifyContent:"space-between"}]}>
        <Pressable style={styles.postDetails} onPress={() => navigation.navigate("Comments")}>
          <SVGcomment width={24} height={24} style={{ marginRight: 6 }} />
          <Text
            style={{ color: "#BDBDBD", fontFamily: "Roboto", fontSize: 16 }}
          >
            {comments ? comments : 0}
          </Text>
        </Pressable>
        <Pressable style={styles.postDetails} onPress={() => navigation.navigate("Map")}>
          <SVGlocation width={24} height={24} style={{ marginRight: 4 }} />
          <Text
            style={{
              color: "#212121",
              fontFamily: "Roboto",
              fontSize: 16,
              textDecorationLine: "underline",
            }}
          >
            {location}
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
