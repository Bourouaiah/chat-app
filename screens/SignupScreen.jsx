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

import { useDispatch, useSelector } from "react-redux";
import { setNewUser } from '../app/slices/AvatarSlice';

import {
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { StatusBar } from "expo-status-bar";

import Toast from "react-native-toast-message";

import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { avatarPic } = useSelector((state) => state.avatar);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securePassword, setSecurePassword] = useState(true);

  const handleSecurePassword = () => {
    setSecurePassword((prevValue) => !prevValue);
  };

  const createUser = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        await updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            addDoc(collection(db, "users"), {
              name,
              email,
              password,
              profilePic: avatarPic,
            });
          })
          .then(() => {
            dispatch(setNewUser({ userName: name, userEmail: email }));
          })
          .then(() => {
            navigation.navigate("Login");
          });
      })
      .catch((error) => {
        alert(error);
        Toast.show({
          type: "error",
          text1: "🔴 Error",
          text2: "Invalid Email, or E-mail adress already in use ⚠️",
        });
      });
  };

  return (
    <ScrollView className="bg-white relative">
      <StatusBar style="light" />
      <Image
        source={require("../assets/background.jpg")}
        className="h-[700px] w-full bg-center"
      />
      <View className="absolute bg-white w-full h-full top-[150px] rounded-tl-[100px] flex-1">
        <KeyboardAvoidingView className="flex-1 flex items-center h-full">
          <Image
            className="w-[50px] h-[50px] rounded-full mt-5"
            source={require("../assets/logo.png")}
          />
          <Text className="my-5 text-primaryText text-lg font-bold">
            Join with us!
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("AvatarSelect")}>
            <View className="border-2 border-primary w-[80px] h-[80px] rounded-full relative mb-3">
              <View className="absolute right-[1px] top-[5px] z-10 bg-primary rounded-full p-[3px]">
                <MaterialIcons name="edit" size={10} color="white" />
              </View>
              <Image
                className="w-full h-full flex items-center justify-center rounded-full"
                source={avatarPic}
              />
            </View>
          </TouchableOpacity>
          <View className="w-full px-7">
            <View className="flex flex-row items-center space-x-2 border border-gray-300 my-2 p-3 rounded-md">
              <FontAwesome5 name="user-alt" size={24} color="#6c6d83" />
              <TextInput
                keyboardType="default"
                className="flex-1 text-primaryText"
                placeholder="Full Name"
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>
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
            onPress={createUser}
            className="bg-primary w-[60%] p-3 rounded-md my-4"
          >
            <Text className="text-white text-center font-bold">Sign Up</Text>
          </TouchableOpacity>
          <View className="flex flex-row items-center space-x-2">
            <Text>Have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="text-primary font-bold">Login Here!</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;
