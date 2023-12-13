import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

import { store } from "./app/store";
import { Provider } from "react-redux";

import { Home, Login, Signup, AvatarSelect, Splash, CreateNewChat, AccountDetails, Chat } from "./screens";

import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="AvatarSelect" component={AvatarSelect} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="CreateNewChat" component={CreateNewChat} />
            <Stack.Screen name="AccountDetails" component={AccountDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      <Toast />
    </>
  );
};

export default App;
