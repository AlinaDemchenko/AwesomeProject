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
import * as yup from 'yup';


function PostsScreen() {
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const handlePressIn = () => {
    setPasswordVisibility(false);
  };

  const handlePressOut = () => {
    setPasswordVisibility(true);
  };

  const handleEmailFocus = () => {
    setIsEmailFocused(!isEmailFocused);
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(!isPasswordFocused);
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required')
      .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Must contain at least one digit'),
  })

  // const signIn = () => {
  //   Alert.alert(`password: ${password}, email: ${email}`);
  // };

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
             validationSchema={validationSchema}
              initialValues={{ email: "", password: "" }}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({
     handleChange,
     handleBlur,
     handleSubmit,
     values,
     errors,
     isValid,
   }) => (
                <>
                  <FormField>
                    <Input
                    name="email"
                      placeholder="Адреса електронної пошти"
                      keyboardType="email-address"
                      value={values.email}
                      setter={handleChange("email")}
                      isFocused={isEmailFocused}
                      onBlur={handleBlur('email')}
                      handleFocus={handleEmailFocus}
                    />
                     {errors.email &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
       }
                    <View style={{ position: "relative" }}>
                      <Input
                            name="password"
                        placeholder="Пароль"
                        secureTextEntry={passwordVisibility}
                        value={values.password}
                        setter={handleChange("password")}
                        isFocused={isPasswordFocused}
                        handleFocus={handlePasswordFocus}
                        onBlur={handleBlur('password')}
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
                    </View>
                    {errors.password &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
       }
                  </FormField>
                  <SubmitButton onPress={handleSubmit} disabled={!isValid}>
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
  formField: {
    width: "100%",
    flex: 1,
    alignItems: "stretch",
    gap: 16,
    marginBottom: 43,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderStyle: "solid",
    paddingHorizontal: 16,
    borderRadius: 7,
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#212121",
  },
  submitButton: {
    maxHeight: 51,
    backgroundColor: "#FF6C00",
    width: "100%",
    borderRadius: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
});

export default PostsScreen;
