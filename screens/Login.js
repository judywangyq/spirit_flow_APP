import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseSetup";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signupHandler = () => {
    navigation.replace("Signup");
  };
  const loginHandler = async () => {
    if (!email || !password) {
      Alert.alert("Fields should not be empty");
      return;
    }
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log("******************This is User Cred******************");
      console.log(userCred);
      console.log("******************This is User Cred******************");
    } catch (err) {
      console.log(err);
      if (err.code === "auth/invalid-login-credentials") {
        Alert.alert("invalid credentials");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SpiritFlow</Text>
      <View style={styles.spacing} />
      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
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
      <Button title="Login" onPress={loginHandler} />
      <Button title="New User? Create An Account" onPress={signupHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    paddingHorizontal: 20, 
  },
  title: {
    fontSize: 50, 
    fontWeight: "bold", 
    // marginLeft: 10,
    marginTop: 100, 
    marginBottom: 10,
    fontFamily:"Cochin",
  },
  spacing: {
    marginBottom: 80,
  },
  input: {
    borderColor: "#552055",
    borderWidth: 2,
    width: "100%", 
    marginVertical: 5,
    padding: 10, 
  },
  label: {
    marginLeft: 10,
    marginBottom: 5, 
    alignSelf: "flex-start",
  },
});