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
          title: "first notification",
          body: "OUR FIRST NOTIFICATION EVER!",
          // data: { URL:"www.google.com" },
        },
        trigger: { seconds: 5 },
      });
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
        <Text style={styles.buttonText}>Remind me to receive diving energy guidance !</Text>
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