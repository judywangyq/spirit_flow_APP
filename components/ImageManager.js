import { View, Image, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons'; 

import PressableButton from "../PressableButton";

export default function ImageManager({ passImageUri }) {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState("");
  const verifyPermission = async () => {
    if (status.granted) {
      return true;
    }
    const response = await requestPermission();
    return response.granted;
  };
  const takeImageHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to give access to the camera");
      }
      //   if hasPermission, launch the camera

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
      console.log(result);
      setImageUri(result.assets[0].uri);
      passImageUri(result.assets[0].uri);
    } catch (err) {
      console.log("take image error ", err);
    }
  };

  return (
    <View style={{ alignItems: 'center', marginTop: 50 }}>
      {/* <Button onPress={takeImageHandler} title="Add a profile photo"  /> */}
      <PressableButton
        pressedFunction={takeImageHandler}
        defaultStyle={{ backgroundColor: "#bbb", padding: 10}}
        pressedStyle={{ opacity: 0.6 }}
        >
        <Entypo name="camera" size={24} color="black" />
      </PressableButton>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    marginTop: 50,
    width: 100,
    height: 100,
  },
});