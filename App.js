import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import UserProfile from './screens/UserProfile';
import Home from './screens/Home';
import Journal from './screens/Journal';
import { database } from "./firebase/firebaseSetup";

export default function App() {
  // console.log(database);

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>

      <Tab.Navigator>

        <Tab.Screen
          name="Home"
          component={Home}
        />
        <Tab.Screen
          name="Journal"
          component={Journal}
        />
      </Tab.Navigator>

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
