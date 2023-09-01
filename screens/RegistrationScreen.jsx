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
import SVGAdd from "../assets/images/add.svg";
import Input from "../components/Input";
import Title from "../components/Title";
import FormField from "../components/FormField";
import SubmitButton from "../components/SubmitButton";
import { registrationSchema } from "../utils/yupSchema";

function RegistrationScreen() {
  const [isLoginFocused, setIsLoginFocused] = useState(false);
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
        keyboardVerticalOffset={-164}
        style={{ flex: 1 }}
      >
        <ImageBackground
          source={require("../assets/images/backgroung.png")}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          <View style={styles.registrationScreen}>
            <View style={styles.userImage}>
              <SVGAdd
                width={25}
                height={25}
                style={{ position: "absolute", right: -12, bottom: 14 }}
              />
            </View>
            <Title style={{ fontFamily: "Roboto-Medium", fontSize: 30 }}>
              Реєстрація
            </Title>
            <Formik
              validationSchema={registrationSchema}
              initialValues={{ email: "", password: "", login: "" }}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                resetForm();
              }}
            >
              {({ handleChange, handleSubmit, values, errors, touched }) => (
                <>
                  <FormField>
                    <Input
                      name="login"
                      placeholder="Логін"
                      value={values.login}
                      setter={handleChange("login")}
                      isFocused={isLoginFocused}
                      handleFocus={() => setIsLoginFocused(true)}
                      onBlur={() => {
                        setIsLoginFocused(false);
                      }}
                    />
                    {errors.login && touched.login && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: "red",
                          position: "absolute",
                          left: 0,
                          top: -15,
                        }}
                      >
                        {errors.login}
                      </Text>
                    )}
                    <View style={{ position: "relative" }}>
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
                    </View>
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
                          setIsPasswordFocused(false)
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
                  <SubmitButton onPress={handleSubmit}>
                    <Text
                      style={{
                        color: "#fff",
                        fontFamily: "Roboto",
                        fontSize: 16,
                      }}
                    >
                      Зареєстуватися
                    </Text>
                  </SubmitButton>
                </>
              )}
            </Formik>
            <Text
              style={{ color: "#1B4371", fontFamily: "Roboto", fontSize: 16 }}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              Вже є акаунт? Увійти
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
  registrationScreen: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "white",
    alignItems: "center",
    maxHeight: 549,
    width: "100%",
    paddingTop: 92,
    paddingHorizontal: 16,
    paddingBottom: 78,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    position: "relative",
  },
  userImage: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    position: "absolute",
    top: -60,
  },
});

export default RegistrationScreen;
