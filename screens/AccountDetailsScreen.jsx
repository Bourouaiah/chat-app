import { View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";

import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const AccountDetailsScreen = ({ navigation }) => {
  const { avatarPic, userName, userEmail } = useSelector(
    (state) => state.avatar
  );

  const signoutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView className="px-5 bg-white flex-1">
      <View className="flex flex-row justify-between items-center mt-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#6c6d83" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="#6c6d83"
          />
        </TouchableOpacity>
      </View>
      <View>
        <View className="border-2 border-primary w-[60px] h-[60px] rounded-full items-center m-auto">
          <Image className="w-full h-full rounded-full" source={avatarPic} />
        </View>
        <Text className="text-primary text-center text-lg font-bold mt-3">
          {userName}
        </Text>
        <Text className="text-primaryText text-center">{userEmail}</Text>
      </View>
      <View className="flex flex-row justify-between my-8">
        <View>
          <View className="flex w-[50px] h-[50px] mb-1 bg-red-200 items-center justify-center rounded-md">
            <MaterialCommunityIcons
              name="message-text"
              size={30}
              color="#6c6d83"
            />
          </View>
          <Text className="text-primaryText">Message</Text>
        </View>
        <View>
          <View className="flex w-[50px] h-[50px] mb-1 bg-red-200 items-center justify-center rounded-md">
            <FontAwesome5 name="video" size={24} color="#6c6d83" />
          </View>
          <Text className="text-center max-w-[50px] text-primaryText">
            Video Call
          </Text>
        </View>
        <View>
          <View className="flex w-[50px] h-[50px] mb-1 bg-red-200 items-center justify-center rounded-md">
            <MaterialIcons name="call" size={24} color="#6c6d83" />
          </View>
          <Text className="text-center text-primaryText">Call</Text>
        </View>
        <View className="flex">
          <View className="flex w-[50px] h-[50px] mb-1 bg-red-200 items-center justify-center rounded-md">
            <Feather name="more-horizontal" size={24} color="#6c6d83" />
          </View>
          <Text className="text-center text-primaryText">More</Text>
        </View>
      </View>
      <View>
        <View className="flex flex-row justify-between mb-5">
          <Text className="text-primaryText">Media Shared</Text>
          <TouchableOpacity>
            <Text className="text-primaryText">VIEW ALL</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between">
          <Image
            className="w-[80px] h-[80px] rounded-xl"
            source={require("../assets/football-fans.jpg")}
          />
          <Image
            className="w-[80px] h-[80px] rounded-xl"
            source={require("../assets/bird-in-nature.jpg")}
          />
          <TouchableOpacity>
            <View className="w-[80px] h-[80px] relative flex items-center justify-center bg-black rounded-xl overflow-hidden">
              <View className="absolute z-10 bg-littleBlack w-full h-full flex items-center justify-center">
                <Text className="text-white">250 +</Text>
              </View>
              <Image
                className="w-full h-full"
                source={require("../assets/mosque.jpg")}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex space-y-4 mt-8">
        <TouchableOpacity>
          <View className="flex flex-row items-center space-x-4">
            <MaterialCommunityIcons
              name="shield-lock"
              size={30}
              color="#6c6d83"
            />
            <Text className="flex-1 text-lg text-primaryText">Privacy</Text>
            <MaterialIcons name="arrow-forward-ios" size={24} color="#6c6d83" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="flex flex-row items-center space-x-4">
            <MaterialIcons name="group" size={30} color="#6c6d83" />
            <Text className="flex-1 text-lg text-primaryText">Groups</Text>
            <MaterialIcons name="arrow-forward-ios" size={24} color="#6c6d83" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="flex flex-row items-center space-x-4">
            <MaterialCommunityIcons
              name="folder-download"
              size={30}
              color="#6c6d83"
            />
            <Text className="flex-1 text-lg text-primaryText">
              Media & Downloads
            </Text>
            <MaterialIcons name="arrow-forward-ios" size={24} color="#6c6d83" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="flex flex-row items-center space-x-4">
            <MaterialCommunityIcons name="account" size={30} color="#6c6d83" />
            <Text className="flex-1 text-lg text-primaryText">Account</Text>
            <MaterialIcons name="arrow-forward-ios" size={24} color="#6c6d83" />
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={signoutUser}>
        <Text className="text-primary text-lg text-center font-bold mt-5">
          Logout
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AccountDetailsScreen;
