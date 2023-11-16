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

const Stack = createNativeStackNavigator();
const AuthStack = (
  <>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
  </>
);

const AppStack = (
  <>
    <Stack.Screen
      name="Home"
      component={Home}
      options={({ navigation }) => {
        return {
          headerTitle: "SpiritFlow",
          headerRight: () => {
            return (
              <PressableButton
              pressedFunction={() => {
                console.log("logout pressed");
                try {
                  signOut(auth);
                } catch (err) {
                  console.log("singout err", err);
                }
              }}
              defaultStyle={{ backgroundColor: "#bbb", padding: 5 }}
              pressedStyle={{ opacity: 0.6 }}
            >
              <Ionicons name="exit" size={24} color="black" />
            </PressableButton>
            );
          },
        };
      }}
    />
    <Stack.Screen
      name="UserProfile"
      component={UserProfile}
      options={{
        headerRight: () => {
          return (
            <PressableButton
              pressedFunction={() => {
                console.log("logout pressed");
                try {
                  signOut(auth);
                } catch (err) {
                  console.log("singout err", err);
                }
              }}
              defaultStyle={{ backgroundColor: "#bbb", padding: 5 }}
              pressedStyle={{ opacity: 0.6 }}
            >
              <Ionicons name="exit" size={24} color="black" />
            </PressableButton>
          );
        },
      }}
    />
    <Stack.Screen
      name="Journal"
      component={Journal}
      options={
        ({ route }) => {
          return {
            title: route.params ? route.params.pressedGoal.text : "Details",
          };
        }
        //pass a function that receives route prop as argument
        //use route prop to extrat goal text and set it on title
      }
    />
  </>
);

export default function App() {
  const Tab = createBottomTabNavigator();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
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
