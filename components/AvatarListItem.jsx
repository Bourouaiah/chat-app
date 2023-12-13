import { View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { selectNewAvatar } from "../app/slices/AvatarSlice";

const AvatarListItem = ({ uri, navigation }) => {
  const dispatch = useDispatch();

  const handleSelectAvatar = () => {
    dispatch(selectNewAvatar(uri));
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handleSelectAvatar}>
      <View className="border-2 border-primary w-[80px] h-[80px] rounded-full relative mb-3">
        <Image
          className="w-full h-full flex items-center justify-center rounded-full"
          source={uri}
        />
      </View>
    </TouchableOpacity>
  );
};

export default AvatarListItem;
