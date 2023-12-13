import { View, Text, Image } from "react-native";
import React from "react";

import { useSelector } from "react-redux";

const ChatMessage = ({ sender, message, timeStamp, avatarPic }) => {
  const { userName } = useSelector((state) => state.avatar);

  const formattedTime = timeStamp?.toDate().toLocaleTimeString();

  if (userName === sender) {
    return (
      <View className="flex items-end my-3">
        <Text className="bg-primary text-white font-bold rounded-l-lg rounded-tr-lg p-3">
          {message}
        </Text>
        <Text className="font-bold text-primaryText">{formattedTime}</Text>
      </View>
    );
  } else {
    return (
      <View className="flex flex-row space-x-3 items-center justify-start my-3">
        <View className="border-2 border-primary w-[60px] h-[60px] rounded-full">
          <Image className="w-full h-full rounded-full" source={avatarPic} />
        </View>
        <View className="flex space-y-1">
          <Text className="text-xs text-primaryBold font-bold">{sender}</Text>
          <Text className="bg-red-200 p-3 rounded-r-lg rounded-tl-lg">
            {message}
          </Text>
          <Text className="font-bold text-primaryText">{formattedTime}</Text>
        </View>
      </View>
    );
  }
};

export default ChatMessage;
