import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseSetup";
import { addUser } from "../firebase/firestoreHelper";

export default function Signup({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const loginHandler = () => {
    navigation.replace("Login");
  };
  const signupHandler = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Fields should not be empty");
      return;
    }
    if (confirmPassword !== password) {
      Alert.alert("password and confirmpassword should be equal");
      return;
    }
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCred.user, { displayName: fullName });

      const { user } = userCred;

      const newUser = await addUser({
        uid: user.uid,
        email: user.email,
        fullName: fullName, // Add other user details as needed
      });
      
      console.log("User added to Firestore with ID:", newUser);

    } catch (err) {
      console.log("sign up error ", err.code);
      if (err.code === "auth/invalid-email") {
        Alert.alert("email is invalid");
      } else if (err.code === "auth/weak-password") {
        Alert.alert("password should be minimum 6 characters");
      } else if (err.code === "auth/email-already-in-use") {
        Alert.alert("email already in use, please use another email");
      }
    }
  };
  return (
    <View style={styles.container}>
    <Text style={styles.label}>Full Name</Text>
    <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={(changedText) => {
        setFullName(changedText);
        }}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(changedText) => {
          setEmail(changedText);
        }}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onChangeText={(changedText) => {
          setPassword(changedText);
        }}
      />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(changedText) => {
          setConfirmPassword(changedText);
        }}
      />
      <Button title="Register" onPress={signupHandler} />
      <Button title="Already Registered? Login" onPress={loginHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  input: {
    borderColor: "#552055",
    borderWidth: 2,
    width: "90%",
    margin: 5,
    padding: 5,
  },
  label: {
    marginLeft: 10,
  },
});