// import { StatusBar } from 'expo-status-bar';
// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { auth, firestore } from "../firebase/firebaseSetup";
// import { database } from "../firebase/firebaseSetup";
// import { collection, getDoc, doc } from 'firebase/firestore';

// const UserProfile = () => {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');

//   useEffect(() => {
//     const uid = auth.currentUser?.uid;
//     console.log("Current UID1:", uid);
//     if (!uid) {
//       // Handle the case where the user is not yet authenticated
//       console.log("uid not exist");
//       return null;
//     }
//     if(uid){
//       console.log("uid exist");
//     }

//     const fetchData = async () => {
//       console.log("Current UID2:", uid);
//       try {
//         const userDocRef = doc(database, 'users', uid);
//         const userDoc = await getDoc(userDocRef);

//         if (userDoc.exists()) {
//           const userData = userDoc.data();
//           setFullName(userData.fullName);
//           setEmail(userData.email);
//         } else {
//           console.log('User document does not exist');
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <View>
//       <Text>Email: {email}</Text>
//       <Text>Full Name: {fullName}</Text>
//     </View>
//   );
// };

// export default UserProfile;


import { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { auth, database } from "../firebase/firebaseSetup";
import { doc, getDoc } from 'firebase/firestore';

const UserProfile = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async (uid) => {
      console.log('Fetching user data for UID:', uid);
      try {
        const userDocRef = doc(database, 'users', uid);
        const docSnap = await getDoc(userDocRef);
        console.log('Document snapshot exists:', docSnap.exists());
    
        if (docSnap.exists()) {
          const userData = docSnap.data();
          console.log('User data:', userData);
          setFullName(userData.fullName);
          setEmail(userData.email);
        } else {
          console.log('User document does not exist');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const uid = auth.currentUser?.uid;
    console.log('Authenticated user:', auth.currentUser);

    if (uid) {
      fetchUserData(uid);
    } else {
      console.log('UID does not exist');
    }
  }, [auth.currentUser]); // Add auth.currentUser as a dependency

  const handleEditPress = () => {
    // Add logic for handling the edit button press
    console.log('Edit button pressed');
    // You can navigate to another screen or show a modal for editing here
  };
  
  return (
    <View>
      <Text>Email: {email}</Text>
      <Text>Full Name: {fullName}</Text>
      <Button title="Edit" onPress={handleEditPress} />
    </View>
  );
};

export default UserProfile;
