import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";

import { useSelector } from "react-redux";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";

import { db } from "../firebase";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import ChatMessage from "../components/ChatMessage";
import { StatusBar } from "expo-status-bar";

const ChatScreen = ({ navigation, route }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollViewRef = useRef(null);
  const textInputRef = useRef(null);

  const { avatarPic, userName } = useSelector((state) => state.avatar);
  const { chatName, chatId } = route.params;

  const sendMessage = async () => {
    const timeStamp = serverTimestamp();
    const id = `${Date.now()}`;
    const _doc = {
      _id: id,
      chatId: chatId,
      timeStamp: timeStamp,
      message: message,
      user: userName,
      avatarPic: avatarPic,
    };
    setMessage("");
    await addDoc(collection(db, "chats", chatId, "messages"), _doc)
      .then(() => {})
      .catch((error) => alert(error));

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  useLayoutEffect(() => {
    const msgQuery = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("timeStamp", "asc")
    );

    const unsub = onSnapshot(msgQuery, (querySnap) => {
      const upMsg = querySnap.docs.map((doc) => doc.data());
      setMessages(upMsg);
      setLoading(false);
    });

    return unsub;
  }, []);

  const handleKeyboardDidShow = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardDidShow
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-primaryBold pt-3">
      <StatusBar style="light" />
      <View className="flex flex-row items-center space-x-3 px-5">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <MaterialIcons name="arrow-back-ios" size={24} color="white" />
        </TouchableOpacity>
        <View className="flex flex-row items-center space-x-3 flex-1">
          <View className="border-2 border-white w-[50px] h-[50px] rounded-full flex items-center justify-center">
            <FontAwesome5 name="users" size={28} color="white" />
          </View>
          <View>
            <Text className="text-white font-bold">{chatName}</Text>
            <Text className="text-white text-xs">Online</Text>
          </View>
        </View>
        <View className="flex flex-row items-center space-x-3">
          <TouchableOpacity>
            <FontAwesome5 name="video" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="call" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className="relative bg-white flex-1 mt-5 overflow-hidden">
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset="50px"
        >
          {loading ? (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#43C651" />
            </View>
          ) : messages.length === 0 ? (
            <View className="mt-5 items-center">
              <Text className="text-2xl font-bold text-center">
                No messages yet...
              </Text>
              <Text className="text-lg text-center text-primaryText">
                Start messaging with others!
              </Text>
              <Image
                className="w-[400px] h-[400px]"
                source={require("../assets/no-chats-icon.jpg")}
              />
            </View>
          ) : (
            <ScrollView
              ref={scrollViewRef}
              onContentSizeChange={() => {
                if (scrollViewRef.current) {
                  scrollViewRef.current.scrollToEnd({ animated: true });
                }
              }}
              className="flex-1"
              showsVerticalScrollIndicator={false}
            >
              <View className="px-5 pb-[90px] pt-5">
                {messages?.map((msg, i) => (
                  <ChatMessage
                    key={i}
                    sender={msg.user}
                    message={msg.message}
                    avatarPic={msg.avatarPic}
                    timeStamp={msg.timeStamp}
                  />
                ))}
              </View>
            </ScrollView>
          )}
          <View className="flex flex-row items-center space-x-5 absolute bottom-0 p-5 bg-white">
            <TextInput
              ref={textInputRef}
              className="bg-red-200 p-2 rounded-md flex-1"
              placeholder="Type here...."
              value={message}
              onChangeText={(text) => setMessage(text)}
              onFocus={() => {
                textInputRef.current.focus();
              }}
            />
            {message.trim() ? (
              <TouchableOpacity onPress={sendMessage}>
                <Feather name="send" size={24} color="#6c6d83" />
              </TouchableOpacity>
            ) : (
              <View style={{ opacity: 0.5 }}>
                <Feather name="send" size={24} color="#6c6d83" />
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
