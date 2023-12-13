import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, StyleSheet } from "react-native";
import AvatarListItem from "../components/AvatarListItem";
import { StatusBar } from "expo-status-bar";

import avatarZero from "../assets/avatar-0.png";
import avatarOne from "../assets/avatar-1.png";
import avatarTwo from "../assets/avatar-2.png";
import avatarThree from "../assets/avatar-3.png";
import avatarFour from "../assets/avatar-4.png";
import avatarFive from "../assets/avatar-5.png"; // Import the correct avatar for id 5
import avatarSix from "../assets/avatar-6.png"; // Import the correct avatar for id 6
import avatarSeven from "../assets/avatar-7.png"; // Import the correct avatar for id 7
import avatarEight from "../assets/avatar-8.png"; // Import the correct avatar for id 8
import avatarNine from "../assets/avatar-9.png"; // Import the correct avatar for id 9
import avatarTen from "../assets/avatar-10.png"; // Import the correct avatar for id 10
import avatarEleven from "../assets/avatar-11.png"; // Import the correct avatar for id 11
import avatarTwelve from "../assets/avatar-12.png";
import avatarThirteen from "../assets/avatar-13.png";
import avatarFourteen from "../assets/avatar-14.png";
import avatarFifteen from "../assets/avatar-15.png";
import avatarSixteen from "../assets/avatar-16.png";
import avatarSeventeen from "../assets/avatar-17.png";
import avatarEighteen from "../assets/avatar-18.png";
import avatarNineteen from "../assets/avatar-19.png";
import avatarTwenty from "../assets/avatar-20.png";
import avatarTwentyOne from "../assets/avatar-21.png";
import avatarTwentyTwo from "../assets/avatar-22.png";
import avatarTwentyThree from "../assets/avatar-23.png";
import avatarTwentyFour from "../assets/avatar-24.png";
import avatarTwentyFive from "../assets/avatar-25.png";
import avatarTwentySix from "../assets/avatar-26.png";
import avatarTwentySeven from "../assets/avatar-27.png";
import avatarTwentyEight from "../assets/avatar-28.png";
import avatarTwentyNine from "../assets/avatar-29.png";
import avatarThirty from "../assets/avatar-30.png";
import avatarThirtyOne from "../assets/avatar-31.png";
import avatarThirtyTwo from "../assets/avatar-32.png";
import avatarThirtyThree from "../assets/avatar-33.png";
import avatarThirtyFour from "../assets/avatar-34.png";
import avatarThirtyFive from "../assets/avatar-35.png";

const AvatarSelectScreen = ({ navigation }) => {
  const [numColumns, setNumColumns] = useState(3);

  const avatarList = [
    { id: 0, url: avatarZero },
    { id: 1, url: avatarOne },
    { id: 2, url: avatarTwo },
    { id: 3, url: avatarThree },
    { id: 4, url: avatarFour },
    { id: 5, url: avatarFive },
    { id: 6, url: avatarSix }, 
    { id: 7, url: avatarSeven },
    { id: 8, url: avatarEight },
    { id: 9, url: avatarNine },
    { id: 10, url: avatarTen },
    { id: 11, url: avatarEleven }, 
    { id: 12, url: avatarTwelve },
    { id: 13, url: avatarThirteen },
    { id: 14, url: avatarFourteen },
    { id: 15, url: avatarFifteen },
    { id: 16, url: avatarSixteen },
    { id: 17, url: avatarSeventeen },
    { id: 18, url: avatarEighteen },
    { id: 19, url: avatarNineteen },
    { id: 20, url: avatarTwenty },
    { id: 21, url: avatarTwentyOne },
    { id: 22, url: avatarTwentyTwo },
    { id: 23, url: avatarTwentyThree },
    { id: 24, url: avatarTwentyFour },
    { id: 25, url: avatarTwentyFive },
    { id: 26, url: avatarTwentySix },
    { id: 27, url: avatarTwentySeven },
    { id: 28, url: avatarTwentyEight },
    { id: 29, url: avatarTwentyNine },
    { id: 30, url: avatarThirty },
    { id: 31, url: avatarThirtyOne },
    { id: 32, url: avatarThirtyTwo },
    { id: 33, url: avatarThirtyThree },
    { id: 34, url: avatarThirtyFour },
    { id: 35, url: avatarThirtyFive },
  ];

  return (
    <SafeAreaView className="bg-white">
      <StatusBar style="dark" />
      <FlatList
        key={`flat-list-${numColumns}`}
        data={avatarList}
        renderItem={({ item }) => (
          <AvatarListItem uri={item.url} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id.toString()} // Convert id to string
        numColumns={numColumns}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  columnWrapper: {
    justifyContent: "space-around",
  },
});

export default AvatarSelectScreen;
