import { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, database } from "../firebase/firebaseSetup";
import { getDocs, collection, query, where, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import ImageManager from "../components/ImageManager";
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../components/Colors';

const UserProfile = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [takenImageUri, setTakenImageUri] = useState("");

  const fetchUserData = async (uid) => {
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
          uri: takenImageUri,
        });

        // Check if the displayName was successfully updated
        const updatedUser = auth.currentUser;
        console.log('Updated User in Firebase Authentication:', updatedUser);

        if (updatedUser.displayName === fullName) {
          console.log('User profile updated successfully in Firebase Authentication');
        } else {
          console.error('User profile update in Firebase Authentication failed');
        }
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

  function passImageUri(uri) {
    // store the uri in a state variable
    setTakenImageUri(uri);
  }

  return (
    <><LinearGradient
      colors={[
        Colors.Top,
        Colors.Bottom,
      ]} 
      style={styles.background}/>
    <View style={styles.container}>
      <ImageManager passImageUri={passImageUri} />
      {isEditing ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Full Name"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            value={email}
            editable={false}
          />
          <TouchableOpacity onPress={handleSavePress} style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancelPress} style={styles.button}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.viewContainer}>
          <Text style={styles.label}>Full Name: {fullName}</Text>
          <Text style={styles.label}>Email: {email}</Text>
          <TouchableOpacity onPress={handleEditPress} style={styles.button}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View></>
  );
};

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
  viewContainer: {
    marginTop: 50,
  },
  editContainer: {
    marginTop: 50,
  },
  input: {
    borderColor: "#552055",
    borderWidth: 2,
    width: "100%",
    marginVertical: 10,
    padding: 10,
  },
  label: {
    marginLeft: 10,
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  // buttonContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  // },
  button: {
    backgroundColor: '#9b88db',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default UserProfile;


