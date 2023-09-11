import { useState } from "react";
import {
  Alert,
  Image,
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
import { registrationSchema } from "../utils/yupSchema";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, storage } from "../firebase/firebase-config";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/userReducer";
import { ref, getDownloadURL} from "firebase/storage";
import { uploadPhotoToFirebase } from "../firebase/firebase-utils";
import * as ImagePicker from "expo-image-picker";
import SVGAdd from "../assets/images/add.svg";
import SVGdelete from "../assets/images/delete.svg";
import Input from "../components/Input";
import Title from "../components/Title";
import FormField from "../components/FormField";
import SubmitButton from "../components/SubmitButton";

function RegistrationScreen({ navigation }) {
  const [isLoginFocused, setIsLoginFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const handleSignUp = () => {
    navigation.navigate("Home");
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        const updatedUser = {
          displayName: user.login,
          photoURL: avatar ? avatar : null,
        };
        return updateProfile(userCredential.user, updatedUser).then(() => {
          return signInWithEmailAndPassword(
            auth,
            user.email,
            user.password
          ).then(() => {
            console.log("reg", userCredential.user.uid);
            const userData = {
              email: userCredential.user.email,
              token: userCredential.user.uid,
            };
            dispatch(
              signIn({
                ...userData,
                ...updatedUser,
              })
            );
          });
        });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Alert.alert("Користувач з таким email вже зареєстрований");
        } else {
          console.log(error.code, error.message);
        }
      });
  };

  const handleAddAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const avatarURL = result.assets[0].uri;
      const photoId = new Date().getTime();
      const imagePath = `images/${photoId}.jpg`;
      await uploadPhotoToFirebase(avatarURL,imagePath)
      const imageURL = await getDownloadURL(ref(storage, imagePath));
      setAvatar(imageURL); 
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
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
        keyboardVerticalOffset={-164}
        style={{ flex: 1 }}
      >
        <ImageBackground
          source={require("../assets/images/backgroung.png")}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          <View style={styles.registrationScreen}>
            <View style={{ position: "absolute", top: -60 }}>
              {avatar ? (
                <>
                  <Image style={styles.userImage} source={{ uri: avatar }} />
                  <Pressable
                    onPress={handleRemoveAvatar}
                    style={{ position: "absolute", right: -12, bottom: 14 }}
                  >
                    <SVGdelete width={25} height={25} />
                  </Pressable>
                </>
              ) : (
                <>
                  <View style={styles.userImage}></View>
                  <Pressable
                    onPress={handleAddAvatar}
                    style={{ position: "absolute", right: -12, bottom: 14 }}
                  >
                    <SVGAdd width={25} height={25} />
                  </Pressable>
                </>
              )}
            </View>
            <Title style={{ fontFamily: "Roboto-Medium", fontSize: 30 }}>
              Реєстрація
            </Title>
            <Formik
              validationSchema={registrationSchema}
              initialValues={{ email: "", password: "", login: "" }}
              onSubmit={(values, { resetForm }) => {
                setUser(values);
                if (user) {
                  resetForm();
                  handleSignUp();
                }
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
              style={styles.link}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              Вже є акаунт?{" "}
              <Text
                onPress={() => navigation.navigate("Login")}
                style={[styles.link, { textDecorationLine: "underline" }]}
              >
                Увійти
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
  },
});

export default RegistrationScreen;
