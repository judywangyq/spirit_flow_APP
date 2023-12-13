import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseSetup";
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../components/Colors';

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
    <><LinearGradient
      colors={[
        Colors.Top,
        Colors.Bottom,
      ]}
      style={styles.background} />
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
          } } />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          value={password}
          onChangeText={(changedText) => {
            setPassword(changedText);
          } } />
        <Button title="Login" onPress={loginHandler} />
        <Button title="New User? Create An Account" onPress={signupHandler} />
      </View></>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 900,
  },
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "stretch",
    paddingHorizontal: 20, 
  },
  title: {
    fontSize: 50, 
    fontWeight: "bold", 
    color:'#472e32',
    // marginLeft: 10,
    marginTop: 100, 
    marginBottom: 10,
    // fontFamily:'Arial, sans-serif',
    
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