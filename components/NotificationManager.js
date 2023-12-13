import { View, Text, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";
import { Ionicons } from '@expo/vector-icons';

export default function NotificationManager() {
  const verifyPermission = async () => {
    try {
      const status = await Notifications.getPermissionsAsync();
      console.log(status)
      if (status.granted) {
        return true;
      }
      const response = await Notifications.requestPermissionsAsync({
        ios: { allowBadge: true },
      });
      return response.granted;
    } catch (err) { console.log("verify permission ", err) }
  };

  const scheduleNotificationHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to give permission to send notification");
        return;
      }
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Happening Now!",
          body: "Click to connect with your divine energy",
          // data: { URL:"www.google.com" },
        },
        trigger: {
          repeats: true,
          // daily: 1,
          hour: 9,
          minute: 0
        },
      });
      Alert.alert("Notification Set", "You'll be reminded every day at 9 AM!");
    } catch (err) {
      console.log("schedule notification error ", err);
    }
  };

  return (
    <View>
      {/* <Button
        title="Remind me to receive diving energy guidance"
        onPress={scheduleNotificationHandler}
      /> */}
      <TouchableOpacity onPress={scheduleNotificationHandler} style={styles.button}>
        <View style={styles.buttonContent}>
          <Ionicons name="ios-notifications-outline" size={20} color="black" />
          <Text style={styles.buttonText}>Click for Daily Inspiration at 9AM!</Text>
          <Ionicons name="ios-notifications-outline" size={20} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContent: {
    flexDirection: 'row', // Align children horizontally
    alignItems: 'center', // Center items vertically
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#9b88db',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});