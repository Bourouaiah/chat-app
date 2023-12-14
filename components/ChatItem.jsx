import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { FontAwesome5 } from "@expo/vector-icons";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const ChatItem = ({ title, chatId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, [chatId]);

  const formattedTime = messages[messages.length - 1]?.timeStamp?.toDate().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

  return (
    <View className="flex flex-row items-center space-x-4 my-2">
      <View className="border-2 border-primary w-[50px] h-[50px] rounded-full flex items-center justify-center">
        <FontAwesome5 name="users" size={28} color="#6c6d83" />
      </View>
      <View className="flex-1">
        <Text className="text-lg font-bold">{title}</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : messages.length === 0 ? (
          <Text className="text-primaryBold font-bold text-xs">You are ready to start messages with your friends!</Text>
        ) : (
          <View className="flex flex-row items-center justify-between space-x-3">
            <Text numberOfLines={2} className="text-primaryText flex-1">
              {messages[messages.length - 1]?.message}
            </Text>
            <Text className="text-primary font-bold">{formattedTime}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ChatItem;
