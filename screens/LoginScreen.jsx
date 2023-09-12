import React, { useEffect, useState } from "react";
import {
  Alert,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Formik } from "formik";
import { loginSchema } from "../utils/yupSchema";
import { useDispatch, useSelector } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import {
  changeAvatar,
  setUserLogin,
  signIn,
} from "../redux/userReducer";
import Title from "../components/Title";
import Input from "../components/Input";
import FormField from "../components/FormField";
import SubmitButton from "../components/SubmitButton";

function LoginScreen({ navigation }) {
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [user, setUser] = useState(null);
  const authorizedUser = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();

useEffect(() => {
if (authorizedUser) navigation.navigate("Home");
}, [])

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        const authUserData = {
          displayName: userCredential.user.displayName,
          email: userCredential.user.email,
          photoURL: userCredential.user.photoURL,
          token: userCredential.user.uid,
        };
        dispatch(signIn(authUserData));
        const currentUser = auth.currentUser;
        console.log("currentUser: ", currentUser);
        if (currentUser !== null) {
          dispatch(changeAvatar(currentUser.photoURL));
          dispatch(setUserLogin(currentUser.displayName));
        }
        setUser(null);
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          Alert.alert("Невірний email");
        } else if (error.code === "auth/wrong-password") {
          Alert.alert("Невірний пароль");
        } else {
          console.log(error.code, error.message);
        }
      });
  };

  const handlePressIn = () => {
    setPasswordVisibility(false);
  };

  const handlePressOut = () => {
    setPasswordVisibility(true);
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
            <Formik
              validationSchema={loginSchema}
              initialValues={{ email: "", password: "" }}
              onSubmit={(values, { resetForm }) => {
                setUser(values);
                if (user) {
                  resetForm();
                  handleSignIn();
                }
              }}
            >
              {({ handleChange, handleSubmit, values, errors, touched }) => (
                <>
                  <FormField>
                    <Input
                      name="email"
                      placeholder="Адреса електронної пошти"
                      keyboardType="email-address"
                      value={values.email}
                      setter={handleChange("email")}
                      isFocused={isEmailFocused}
                      handleFocus={() => setIsEmailFocused(true)}
                      onBlur={() => {
                        setIsEmailFocused(false);
                      }}
                    />
                    {errors.email && touched.email && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: "red",
                          position: "absolute",
                          left: 0,
                          top: -15,
                        }}
                      >
                        {errors.email}
                      </Text>
                    )}
                    <View style={{ position: "relative" }}>
                      <Input
                        name="password"
                        placeholder="Пароль"
                        secureTextEntry={passwordVisibility}
                        value={values.password}
                        setter={handleChange("password")}
                        isFocused={isPasswordFocused}
                        handleFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => {
                          setIsPasswordFocused(false);
                        }}
                      />
                      <Pressable
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        style={{ position: "absolute", top: 16, right: 16 }}
                      >
                        <Text
                          style={{
                            color: "#1B4371",
                            fontFamily: "Roboto",
                            fontSize: 16,
                          }}
                        >
                          Показати
                        </Text>
                      </Pressable>
                      {errors.password && touched.password && (
                        <Text
                          style={{
                            fontSize: 10,
                            color: "red",
                            position: "absolute",
                            left: 0,
                            top: -15,
                          }}
                        >
                          {errors.password}
                        </Text>
                      )}
                    </View>
                  </FormField>
                  <SubmitButton
                    onPress={handleSubmit}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontFamily: "Roboto",
                        fontSize: 16,
                      }}
                    >
                      Увійти
                    </Text>
                  </SubmitButton>
                </>
              )}
            </Formik>
            <Text style={styles.link}>
              Немає акаунту?{" "}
              <Text
                onPress={() => navigation.navigate("Registration")}
                style={[styles.link, { textDecorationLine: "underline" }]}
              >
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
  link: {
    color: "#1B4371",
    fontFamily: "Roboto",
    fontSize: 16,
  },
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
