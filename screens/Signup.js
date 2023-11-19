import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseSetup";
import { collection, addDoc, doc } from "firebase/firestore";
import { database } from "../firebase/firebaseSetup";

export default function Signup({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const loginHandler = () => {
    navigation.replace("Login");
  };
//   const signupHandler = async () => {
//     if (!fullName || !email || !password || !confirmPassword) {
//       Alert.alert("Fields should not be empty");
//       return;
//     }
//     if (confirmPassword !== password) {
//       Alert.alert("password and confirmpassword should be equal");
//       return;
//     }
//     try {
//       // Create a user with email and password
//       const userCred = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       console.log("User credentials:", userCred);

//       const uid = userCred.user.uid;
//       console.log("UID:", uid);

//       // Save additional user information (Full Name) to Firestore
//       const userDocRef = await addDoc(collection(database, 'users'), {
//         uid: userCred.user.uid,
//         fullName: fullName,
//         email: email,
//       });
  
//       console.log("User document written with ID: ", userDocRef.id);
  
//     } catch (err) {
//       console.log("sign up error ", err.code);
//       if (err.code === "auth/invalid-email") {
//         Alert.alert("email is invalid");
//       } else if (err.code === "auth/weak-password") {
//         Alert.alert("password should be minimum 6 characters");
//       } else if (err.code === "auth/email-already-in-use") {
//         Alert.alert("email already in use, please use another email");
//       }
//     }
//   };
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
      // Create a user with email and password
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User credentials:", userCred);
  
      const uid = userCred.user.uid;
      console.log("UID:", uid);
  
      // Save additional user information (Full Name) to Firestore
      const userDocRef = await addDoc(collection(database, 'users'), {
        uid: userCred.user.uid,
        fullName: fullName,
        email: email,
      });
  
      console.log("User document written with ID: ", userDocRef.id);
  
      // Fetch user data immediately after signup
      fetchUserData(uid);
  
    } catch (err) {
      console.log("sign up error ", err.code);
      if (err.code === "auth/invalid-email") {
        Alert.alert("email is invalid");
      } else if (err.code === "auth/weak-password") {
        Alert.alert("password should be a minimum of 6 characters");
      } else if (err.code === "auth/email-already-in-use") {
        Alert.alert("email already in use, please use another email");
      }
    }
  };

  const fetchUserData = async (uid) => {
    try {
      const userDocRef = doc(database, 'users', uid);
      const docSnap = await getDoc(userDocRef);
  
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setFullName(userData.fullName);
        setEmail(userData.email);
      } else {
        console.log('User document does not exist');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
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