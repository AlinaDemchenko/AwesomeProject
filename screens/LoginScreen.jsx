import React, { useState } from "react";
import {
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
import Title from "../components/Title";
import Input from "../components/Input";
import FormField from "../components/FormField";
import SubmitButton from "../components/SubmitButton";
import { loginSchema } from "../utils/yupSchema";

function LoginScreen({ navigation }) {
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);

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
                resetForm();
                console.log(values);
                navigation.navigate("Home");
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
                    // disabled={!isValid || !touched.email || !touched.password}
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
