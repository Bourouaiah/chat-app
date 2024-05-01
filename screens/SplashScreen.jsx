import { View, Image, ActivityIndicator } from "react-native";
import React, { useLayoutEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getTheUser } from "../app/slices/AvatarSlice";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const SplashScreen = ({ navigation }) => {
  const { avatarPic } = useSelector((state) => state.avatar);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    checkLoggedUser();
  }, []);

  const checkLoggedUser = () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const getCurrentUser = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, "users"));
            const usersData = querySnapshot.docs.map((doc) => ({
              data: doc.data(),
            }));
            const currentUserData = usersData.find(
              (userData) => userData.data.email === user.email
            );

            if (currentUserData) {
              dispatch(
                getTheUser({
                  userName: currentUserData.data.name,
                  userEmail: currentUserData.data.email,
                  avatarPic: currentUserData.data.profilePic,
                  userPassword: currentUserData.data.password,
                })
              );
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };

        getCurrentUser();

        if (user.displayName) {
          unsubscribe(); // Unsubscribe to avoid further callbacks
          navigation.replace("Home");
        }
      } else {
        navigation.replace("Login");
      }
    });
  };

  return (
    <View className="flex-1 items-center justify-center space-y-24">
      <Image
        source={require("../assets/logo.png")}
        className="w-24 h-24 rounded-full"
        resizeMode="contain"
      />
      <ActivityIndicator size={"large"} color={"#43C651"} />
    </View>
  );
};

export default SplashScreen;
