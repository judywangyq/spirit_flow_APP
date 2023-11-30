import { useEffect, useState } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import { auth, database } from "../firebase/firebaseSetup";
import { getDocs, collection, query, where, updateDoc } from 'firebase/firestore';


const UserProfile = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);


  const fetchUserData = async (uid) => {
    console.log("here the uid is,", uid); // here is good
    try {
      const q = query(collection(database, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      console.log("querySnapshot is: ", querySnapshot);
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

        // Fetch user data after a short delay
        setTimeout(() => {
          fetchUserData(uid);
        }, 1000);
      } else {
        // Handle the case where the user is not authenticated
        console.log('User not authenticated');
      }
    });
   
    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleEditPress = () => {
    const originalUserData = { fullName, email };
    setIsEditing(true);
  };

  const handleSavePress = async () => {
    try {
      // Fetch the user document reference
      const q = query(collection(database, "users"), where("uid", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].ref;

        // Update the user document
        await updateDoc(userDoc, {
          fullName,
          email,
        });

        console.log('User data updated successfully');
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
            onChangeText={(text) => setEmail(text)}
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