import { View, Text, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";

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
          title: "Your daily notification is set!",
          body: "You'll receive a daily notification at 9 AM",
          // data: { URL:"www.google.com" },
        },
        trigger: {
          repeats: true,
          daily: 1,
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
        <Text style={styles.buttonText}>Click here to receive daily guidance at 9AM!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#9b88db',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});