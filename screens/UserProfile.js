// import { useEffect, useState } from 'react';
// import { Text, View, Button, TextInput } from 'react-native';
// import { auth, database } from "../firebase/firebaseSetup";
// import { getDocs, collection, query, where, updateDoc } from 'firebase/firestore';
// import { updateProfile } from 'firebase/auth';


// const UserProfile = () => {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [isEditing, setIsEditing] = useState(false);



//   const fetchUserData = async (uid) => {
//     console.log("here the uid is,", uid); // here is good
//     try {
//       const q = query(collection(database, "users"), where("uid", "==", uid));
//       const querySnapshot = await getDocs(q);
//       console.log("querySnapshot is: ", querySnapshot);
//       querySnapshot.forEach((doc) => {
//         const userData = doc.data();
//         setFullName(userData.fullName);
//         setEmail(userData.email);
//       });

//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         const uid = user.uid;
//         console.log('Authenticated user:', user);
//         console.log('Fetching user data for UID:', uid);
//         // Fetch user data after a short delay
//         // setTimeout(() => {
//         //   fetchUserData(uid);
//         // }, 1000);
//         // fetchUserData(uid);
//         try {
//           // 直接调用 fetchUserData
//           await fetchUserData(uid);
//           console.log('User data fetched successfully.');
//         } catch (fetchError) {
//             console.error('Error fetching user data:', fetchError);
//         }
//       } else {
//         // Handle the case where the user is not authenticated
//         console.log('User not authenticated1');
//       }
//     });
   
//     // Cleanup the subscription when the component unmounts
//     return () => unsubscribe();
//   }, []);

//   const handleEditPress = () => {
//     const originalUserData = { fullName, email };
//     setIsEditing(true);
//   };

//   // const handleSavePress = async () => {
//   //   try {
//   //     // Fetch the user document reference
//   //     const q = query(collection(database, "users"), where("uid", "==", auth.currentUser.uid));
//   //     const querySnapshot = await getDocs(q);

//   //     if (!querySnapshot.empty) {
//   //       const userDoc = querySnapshot.docs[0].ref;

//   //       // Update the user document
//   //       await updateDoc(userDoc, {
//   //         fullName,
//   //         email,
//   //       });

//   //       console.log('User data updated successfully');
//   //     } else {
//   //       console.error('User document not found');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error updating user data:', error);
//   //   } finally {
//   //     setIsEditing(false); // Reset the editing state
//   //   }
//   // };

  

//   const handleSavePress = async () => {
//     try {
//       // Fetch the user document reference
//       const userQuery = query(collection(database, "users"), where("uid", "==", auth.currentUser.uid));
//       const querySnapshot = await getDocs(userQuery);
  
//       if (!querySnapshot.empty) {
//         const userDoc = querySnapshot.docs[0].ref;
  
//         // Update the user document in Firestore
//         await updateDoc(userDoc, {
//           fullName: fullName,
//           email: email,
//         });
  
//         console.log('User data updated successfully in Firestore');
  
//         // Update the user's profile in Firebase Authentication
//         const user = auth.currentUser;
//         await updateProfile(user, {
//           displayName: fullName,
//           email: email,
//         });
  
//         console.log('User profile updated in Firebase Authentication:', user);
//       } else {
//         console.error('User document not found');
//       }
//     } catch (error) {
//       console.error('Error updating user data:', error);
//     } finally {
//       setIsEditing(false); // Reset the editing state
//     }
//   };
  
  
  
//   const handleCancelPress = () => {
//     setIsEditing(false); 
//   };

//   return (
//     <View>
//       {isEditing ? (
//         <View>
//           <TextInput
//             placeholder="Enter Full Name"
//             value={fullName}
//             onChangeText={(text) => setFullName(text)}
//           />
//           <TextInput
//             placeholder="Enter Email"
//             value={email}
//             onChangeText={(text) => setEmail(text)}
//           />
//           <Button title="Save" onPress={handleSavePress} />
//           <Button title="Cancel" onPress={handleCancelPress} />
//         </View>
//       ) : (
//         <View>
//           <Text>Email: {email}</Text>
//           <Text>Full Name: {fullName}</Text>
//           <Button title="Edit" onPress={handleEditPress} />
//         </View>
//       )}
//     </View>
//   );
  
// };

// export default UserProfile;

import { useEffect, useState } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import { auth, database } from "../firebase/firebaseSetup";
import { getDocs, collection, query, where, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

const UserProfile = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const fetchUserData = async (uid) => {
    console.log("here the uid is,", uid);
    try {
      const q = query(collection(database, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        setFullName(userData.fullName);
        setEmail(userData.email);
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const uid = user.uid;
        console.log('Authenticated user:', user);
        console.log('Fetching user data for UID:', uid);
        try {
          await fetchUserData(uid);
          console.log('User data fetched successfully.');
        } catch (fetchError) {
          console.error('Error fetching user data:', fetchError);
        }
      } else {
        console.log('User not authenticated1');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEditPress = () => {
    const originalUserData = { fullName, email };
    setIsEditing(true);
  };

  const handleSavePress = async () => {
    try {
      const userQuery = query(collection(database, "users"), where("uid", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].ref;

        // Update the user document in Firestore
        await updateDoc(userDoc, {
          fullName: fullName,
          // Do not update email
        });

        console.log('User data updated successfully in Firestore');

        // Update the user's profile in Firebase Authentication
        const user = auth.currentUser;
        await updateProfile(user, {
          displayName: fullName,
        });

        console.log('User profile updated in Firebase Authentication:', user);
      } else {
        console.error('User document not found');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    } finally {
      setIsEditing(false); // Reset the editing state
    }
  };

  const handleCancelPress = () => {
    setIsEditing(false);
  };

  return (
    <View>
      {isEditing ? (
        <View>
          <TextInput
            placeholder="Enter Full Name"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
          />
          <TextInput
            placeholder="Enter Email"
            value={email}
            editable={false} // Make email input non-editable
          />
          <Button title="Save" onPress={handleSavePress} />
          <Button title="Cancel" onPress={handleCancelPress} />
        </View>
      ) : (
        <View>
          <Text>Email: {email}</Text>
          <Text>Full Name: {fullName}</Text>
          <Button title="Edit" onPress={handleEditPress} />
        </View>
      )}
    </View>
  );
};

export default UserProfile;
