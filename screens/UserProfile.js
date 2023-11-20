import { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { auth, database } from "../firebase/firebaseSetup";
import { doc, getDocs, collection, query, where } from 'firebase/firestore';


const UserProfile = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
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
