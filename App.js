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
import { onAuthStateChanged, signOut } from "firebase/auth";
import AddNewJournal from "./screens/AddNewJournal";
import Discovery from "./screens/Discovery";
import Map from "./components/Map";


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
        headerRight: () => (
          <PressableButton
            pressedFunction={async () => {
              console.log("logout pressed");
              const user = auth.currentUser;
              // console.log(user.providerData);
              // const credential = EmailAuthProvider.credential(user.email, "123456");
              try {
                signOut(auth);
                // // 重新认证用户
                // await reauthenticateWithCredential(user, credential);

                // // 在重新认证成功后执行注销操作
                // await auth.signOut();
                // console.log('User logged out successfully');

                // // 重新获取当前用户对象
                // const updatedCurrentUser = auth.currentUser;

                // // 使用更新后的用户对象进行其他操作
                // console.log("Updated User:", updatedCurrentUser);
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
        headerLeft: () => (
          <PressableButton
            pressedFunction={() => {
              console.log("Menu Button pressed");
              }
            }
            defaultStyle={{ backgroundColor: "#bbb", padding: 5 }}
            pressedStyle={{ opacity: 0.6 }}
          >
            <Ionicons name="menu" size={24} color="black" />
          </PressableButton>
        ),
      })}
    />
    <Tab.Screen name="Journal" component={Journal} />
    {/* <Tab.Screen name="Map" component={Map} /> */}
    <Tab.Screen name="User Profile" component={UserProfile} />
    <Tab.Screen name="Discovery" component={Discovery} />
  </Tab.Navigator>
);

const AppStack = (
  <>
    <Stack.Screen
      name="SpiritFlow"
      component={AppTabs}
    />
    {/* <Stack.Screen
      name="UserProfile"
      component={UserProfile}
      options={{
        headerRight: () => (
          <PressableButton
            pressedFunction={() => {
              console.log("logout pressed");
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
      }}
    /> */}
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
    onAuthStateChanged(auth, (user) => {
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
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#b8a" },
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