import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Title from "../components/Title";
import Input from "../components/Input";
import FormField from "../components/FormField";
import SubmitButton from "../components/SubmitButton";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  // const [passwordVisibility, setPasswordVisibility] = useState(true);
  // const [show, setShow] = useState('Показати')

  // const handlePasswordVisibility = () => {
  //   if (show === 'Показати') {
  //     setShow('Сховати');
  //     setPasswordVisibility(!passwordVisibility);
  //   } else if (show === 'Сховати') {
  //     setShow('Показати');
  //     setPasswordVisibility(!passwordVisibility);
  //   }
  // };

  // <Pressable onPress={handlePasswordVisibility} style={styles.showPassword}>
  //           <Text style={styles.showPasswordText}>{show}</Text>
  //         </Pressable>

  const handleEmailFocus = () => {
    setIsEmailFocused(!isEmailFocused);
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(!isPasswordFocused);
  };

  const signIn = () => {
    Alert.alert(`password: ${password}, email: ${email}`);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-230}
        style={{ flex: 1 }}
      >
        <ImageBackground
          source={require("../assets/images/backgroung.png")}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          <View style={styles.loginScreen}>
            <Title>Увійти</Title>
            <FormField>
              <Input
                placeholder="Адреса електронної пошти"
                keyboardType="email-address"
                value={email}
                setter={setEmail}
                isFocused={isEmailFocused}
                handleFocus={handleEmailFocus}
              />
              <Input
                placeholder="Пароль"
                secureTextEntry={true}
                value={password}
                setter={setPassword}
                isFocused={isPasswordFocused}
                handleFocus={handlePasswordFocus}
              />
              <Text
                style={{
                  position: "absolute",
                  color: "#1B4371",
                  top: 82,
                  right: 16,
                  fontFamily: "Roboto",
                  fontSize: 16,
                }}
              >
                Показати
              </Text>
            </FormField>
            <SubmitButton submit={signIn}>
              <Text
                style={{ color: "#fff", fontFamily: "Roboto", fontSize: 16 }}
              >
                Увійти
              </Text>
            </SubmitButton>
            <Text
              style={{ color: "#1B4371", fontFamily: "Roboto", fontSize: 16 }}
            >
              Немає акаунту?{" "}
              <Text style={{ textDecorationLine: "underline" }}>
                Зареєструватися
              </Text>
            </Text>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  loginScreen: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
    maxHeight: 489,
    width: "100%",
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 144,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    position: "relative",
  },
});

export default LoginScreen;
