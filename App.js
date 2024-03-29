import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
// import { database } from "./firebase/firebaseSetup";
import { auth, database, initializeAuth, EmailAuthProvider, reauthenticateWithCredential } from "./firebase/firebaseSetup";

// ...
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button} from 'react-native';
import "./firebase/firebaseSetup";
import UserProfile from './screens/UserProfile';
import Home from './screens/Home';
import Journal from './screens/Journal';
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import PressableButton from "./PressableButton";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { onAuthStateChanged, signOut } from "firebase/auth";
import AddNewJournal from "./screens/AddNewJournal";
import Discovery from "./screens/Discovery";
import Map from "./components/Map";

import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({

  handleNotification: async function (notification) {
    return {
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: true,
    }
  }
  
});


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = (
  <>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
  </>
);

const AppTabs = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={Home}
      options={({ navigation }) => ({
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" size={24} color="black" />
        ),
        headerRight: () => (
          <PressableButton
            pressedFunction={async () => {
              console.log("logout pressed");
              const user = auth.currentUser;
              // console.log(user.providerData);
              // const credential = EmailAuthProvider.credential(user.email, "123456");
              try {
                signOut(auth);
              } catch (err) {
                console.log("signout err", err);
              }
            }}
            defaultStyle={{ backgroundColor: "#bbb", padding: 5 }}
            pressedStyle={{ opacity: 0.6 }}
          >
            <Ionicons name="exit" size={24} color="black" />
          </PressableButton>
        ),
      })}
    />
    <Tab.Screen 
      name="Journal" 
      component={Journal}
      options={({ navigation }) => ({
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="journal" size={24} color="black" />
        ),
        headerRight: () => (
          <PressableButton
            pressedFunction={async () => {
              console.log("logout pressed");
              const user = auth.currentUser;
              // console.log(user.providerData);
              // const credential = EmailAuthProvider.credential(user.email, "123456");
              try {
                signOut(auth);
              } catch (err) {
                console.log("signout err", err);
  }
            }}
            defaultStyle={{ backgroundColor: "#bbb", padding: 5 }}
            pressedStyle={{ opacity: 0.6 }}
          >
            <Ionicons name="exit" size={24} color="black" />
          </PressableButton>
        ),
      })} 
      />
    {/* <Tab.Screen name="Map" component={Map} /> */}
    <Tab.Screen 
      name="User Profile" 
      component={UserProfile} 
      options={({ navigation }) => ({
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="user" size={24} color="black" />
        ),
        headerRight: () => (
          <PressableButton
            pressedFunction={async () => {
              console.log("logout pressed");
              const user = auth.currentUser;
              // console.log(user.providerData);
              // const credential = EmailAuthProvider.credential(user.email, "123456");
              try {
                signOut(auth);
              } catch (err) {
                console.log("signout err", err);
              }
            }}
            defaultStyle={{ backgroundColor: "#bbb", padding: 5 }}
            pressedStyle={{ opacity: 0.6 }}
          >
            <Ionicons name="exit" size={24} color="black" />
          </PressableButton>
        ),
      })} />
    <Tab.Screen 
      name="Discovery" 
      component={Discovery}
      options={({ navigation }) => ({

        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="nature-people" size={24} color="black" />
        ),

        headerRight: () => (
          <PressableButton
            pressedFunction={async () => {
              console.log("logout pressed");
              const user = auth.currentUser;
              // console.log(user.providerData);
              // const credential = EmailAuthProvider.credential(user.email, "123456");
              try {
                signOut(auth);
              } catch (err) {
                console.log("signout err", err);
  }
            }}
            defaultStyle={{ backgroundColor: "#bbb", padding: 5 }}
            pressedStyle={{ opacity: 0.6 }}
          >
            <Ionicons name="exit" size={24} color="black" />
          </PressableButton>
        ),
      })} />
  </Tab.Navigator>
);

const AppStack = (
  <>
    <Stack.Screen
      name="SpiritFlow"
      component={AppTabs}
    />
    <Stack.Screen
      name="Add New Journal"
      component={AddNewJournal}
    />
    <Stack.Screen name="Map" component={Map} />
  </>
);


export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("******************This is User******************");
      console.log(user);
      console.log("******************This is User******************");
      if (user) {
        // a valid user is logged in
        setIsUserLoggedIn(true);
      } else {
        //before authentication or after logout
        setIsUserLoggedIn(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("received notification ", notification);
      }
    );
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(
          "received response notification ",
          response.notification.request.content.data.url
        );
        Linking.openURL(response.notification.request.content.data.url);
      }
    );
    return () => {
      subscription.remove();
    };
  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#614385" },
          headerTintColor: "white",
        }}
        initialRouteName="Signup"
      >
        {isUserLoggedIn ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});