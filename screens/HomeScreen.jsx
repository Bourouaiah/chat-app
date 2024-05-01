import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

import { Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import { db } from "../firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import ChatItem from "../components/ChatItem";

const HomeScreen = ({ navigation, route }) => {
  const { avatarPic } = useSelector((state) => state.avatar);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "chats"));
        const chatData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setChats(chatData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
    const unsubscribe = onSnapshot(collection(db, "chats"), (snapshot) => {
      const updatedChats = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setChats(updatedChats);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (route.params?.newChat) {
      setChats((prevChats) => {
        const chatExists = prevChats.some(
          (chat) => chat.data.chatName === route.params.newChat
        );

        if (!chatExists) {
          return [
            ...prevChats,
            {
              id: Date.now().toString(),
              data: { chatName: route.params.newChat },
            },
          ];
        }

        return prevChats;
      });
    }
  }, [route.params?.newChat]);

  return (
    <SafeAreaView className="px-5 bg-white flex-1">
      <StatusBar style="dark" />
      <View className="flex flex-row justify-between items-center mt-2">
        <View className="w-[60px] h-[60px]">
          <Image
            className="w-full h-full rounded-full"
            source={require("../assets/logo.png")}
          />
        </View>
        <View
          className={`border-2 border-primary w-[60px] h-[60px] rounded-full ${
            loading ? "flex items-center justify-center" : ""
          } `}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("AccountDetails")}
          >
            {loading ? (
              <ActivityIndicator size={"large"} color={"#43C651"} />
            ) : (
              <Image
                className="w-full h-full rounded-full"
                source={avatarPic}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View className="my-5 flex flex-row justify-between items-center">
        <Text className="text-lg text-primaryText font-bold">Messages</Text>
        <TouchableOpacity onPress={() => navigation.navigate("CreateNewChat")}>
          <Entypo name="message" size={28} color="#6c6d83" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {loading ? (
          <View className="items-center">
            <ActivityIndicator size={"large"} color={"#43C651"} />
          </View>
        ) : chats.length === 0 ? (
          <View className="items-center">
            <Text className="text-2xl font-bold text-center">
              No chats yet...
            </Text>
            <Text className="text-lg text-center text-primaryText">
              Create a chat to start messaging with others!
            </Text>
            <Image
              className="w-[400px] h-[400px]"
              source={require("../assets/no-chats-icon.jpg")}
            />
          </View>
        ) : (
          chats.map((chat) => (
            <TouchableOpacity
              key={chat.id}
              onPress={() =>
                navigation.navigate("Chat", {
                  chatId: chat.id,
                  chatName: chat.data.chatName,
                })
              }
            >
              <ChatItem title={chat.data.chatName} chatId={chat.id} />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
