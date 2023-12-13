import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";

import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import Toast from "react-native-toast-message";


import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securePassword, setSecurePassword] = useState(true);

  const handleSecurePassword = () => {
    setSecurePassword((prevValue) => !prevValue);
  };

  const loginInWithUser = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.replace("Home")
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "🔴 Error",
          text2: "User Not Found, or Wrong Password, Try Again ⚠️",
        });
      });
  };

  return (
    <ScrollView className="bg-white relative">
      <StatusBar style="light" />
      <Image
        source={require("../assets/background.jpg")}
        className="h-[600px] w-full bg-center"
      />
      <View className="absolute bg-white w-full h-full top-[150px] rounded-tl-[100px] flex-1">
        <KeyboardAvoidingView className="flex-1 flex items-center h-full">
          <Image
            className="w-[50px] h-[50px] rounded-full mt-5"
            source={require("../assets/logo.jpg")}
          />
          <Text className="my-5 text-primaryText text-lg font-bold">
            Welcome Back!
          </Text>
          <View className="w-full px-7">
            <View className="flex flex-row items-center space-x-2 border border-gray-300 my-2 p-3 rounded-md">
              <MaterialIcons name="email" size={24} color="#6c6d83" />
              <TextInput
                keyboardType="email-address"
                autoCapitalize="none"
                className="flex-1 text-primaryText"
                placeholder="Email Here"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View className="flex flex-row items-center border border-gray-300 my-2 p-3 rounded-md">
              <MaterialCommunityIcons name="lock" size={24} color="#6c6d83" />
              <TextInput
                autoCapitalize="none"
                secureTextEntry={securePassword}
                className="flex-1 mx-2 text-primaryText"
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <TouchableOpacity onPress={handleSecurePassword}>
                <MaterialCommunityIcons
                  name={`eye${securePassword ? "" : "-off"}`}
                  size={24}
                  color="#6c6d83"
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={loginInWithUser}
            className="bg-primary w-[60%] p-3 rounded-md my-6"
          >
            <Text className="text-white text-center font-bold">Sign In</Text>
          </TouchableOpacity>
          <View className="flex flex-row items-center space-x-2">
            <Text>Don't have account ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text className="text-primary font-bold">Create an account!</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
