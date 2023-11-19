import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { database } from "./firebase/firebaseSetup";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button} from 'react-native';
import UserProfile from './screens/UserProfile';
import Home from './screens/Home';
import Journal from './screens/Journal';
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import PressableButton from "./PressableButton";
import { Ionicons } from "@expo/vector-icons";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/firebaseSetup";
import AddNewJournal from "./screens/AddNewJournal";

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
        // headerTitle: "SpiritFlow",
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
    <Tab.Screen name="User Profile" component={UserProfile} />
  </Tab.Navigator>
);

const AppStack = (
  <>
    <Stack.Screen
      name="AppTabs"
      component={AppTabs}
    />
    <Stack.Screen
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
    />
    <Stack.Screen
      name="Add New Journal"
      component={AddNewJournal}
    />
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
// export default function App() {
//   // console.log(database);

//   const Tab = createBottomTabNavigator();

//   return (
//     <NavigationContainer>

//       <Tab.Navigator>

//         <Tab.Screen
//           name="Home"
//           component={Home}
//         />
//         <Tab.Screen
//           name="Journal"
//           component={Journal}
//         />
//       </Tab.Navigator>

//     </NavigationContainer>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});