import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { SafeAreaView } from "react-native-safe-area-context";

import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const CreateNewChatScreen = ({ navigation }) => {
  const { avatarPic } = useSelector((state) => state.avatar);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const addNewChat = async () => {
    try {
      setLoading(true);
      await addDoc(collection(db, "chats"), { chatName: input });
      navigation.navigate("Home", { newChat: input });
    } catch (error) {
      console.error("Error adding new chat:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <StatusBar style="light" />
      <View className="flex flex-row items-center justify-between px-5 mt-2">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="white" />
        </TouchableOpacity>
        <View className="border-2 border-white w-[60px] h-[60px] rounded-full">
          <TouchableOpacity onPress={() => navigation.navigate("AccountDetails")}>
            <Image className="w-full h-full rounded-full" source={avatarPic} />
          </TouchableOpacity>
        </View>
      </View>
      <View className="bg-white flex-1 rounded-t-[50px] mt-8 p-10">
        <View className="flex flex-row items-center space-x-2 border border-primaryText p-3 rounded-lg">
          <Ionicons name="md-chatbubbles" size={24} color="#6c6d83" />
          <TextInput
            onChangeText={(text) => setInput(text)}
            className="flex-1"
            placeholder="Search or Create a chat"
          />
          <TouchableOpacity onPress={addNewChat}>
            {loading ? (
              <ActivityIndicator size="small" color="#6c6d83" />
            ) : (
              <Feather name="send" size={24} color="#6c6d83" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateNewChatScreen;
