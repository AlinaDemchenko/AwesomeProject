import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import {translateMonthNameToUkrainian } from "../utils/date";

const Comment = ({commentData}) => {
 const userAvatar = useSelector(state => state.authentication.user.photoURL)
  let currentUser = false;
  console.log(commentData);

  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        marginBottom: 24,
      }}
    >
      {!currentUser && (
        <Image
          style={{ width: 28, height: 28, borderRadius: 28, marginRight: 16 }}
          source={{ uri: userAvatar }}
        />
      )}
      <View
        style={[
          styles.commentBlock,
          { borderTopRightRadius: currentUser ? 0 : 6 },
          { borderTopLeftRadius: currentUser ? 6 : 0 },
        ]}
      >
        <Text style={styles.comment}>{commentData.text}</Text>
        <Text  style={[
          styles.date,
          { textAlign: currentUser ? "left" : "right" },
        ]}>{`${commentData.date.day} ${translateMonthNameToUkrainian(commentData.date.month)}, ${commentData.date.year} | ${commentData.date.time}`}</Text>
      </View>
      {currentUser && (
        <Image
          style={{ width: 28, height: 28, borderRadius: 28, marginLeft: 16 }}
          source={{ uri: userAvatar }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  commentBlock: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
    padding: 16,
    flex: 1,
  },
  date: {
    color: "#BDBDBD",
    fontFamily: "Roboto",
    fontSize: 10,
  },
  comment: {
    color: "#212121",
    fontFamily: "Roboto",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
});

export default Comment;
