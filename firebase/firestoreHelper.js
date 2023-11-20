import { collection, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth } from '../firebase/firebaseSetup';
import { database } from "./firebaseSetup";

// export async function addJournal(journal) {
//     try {
//         const docRef = await addDoc(collection(database, "journals"), journal);
//         console.log("Journal Document written with ID: ", docRef.id);
//         console.log("New Journal: ", journal);
//         return docRef.id;
//       } catch (err) {
//         console.error('Error adding new journal:', err);
//         return null; 
//       }
//     }

// export async function addJournal(uid, journal) {
//     try {
//       const docRef = await addDoc(collection(database, `users/${uid}/journals`), journal);
//       console.log("Journal Document written with ID: ", docRef.id);
//       console.log("New Journal: ", journal);
//       return docRef.id;
//     } catch (err) {
//       console.error('Error adding new journal:', err);
//       return null; 
//     }
//   }

export async function addJournal(uid, journal) {
    try {
      const defaultDate = serverTimestamp();
      const journalWithDate = {
        ...journal,
        date: defaultDate,
      };
  
      const docRef = await addDoc(collection(database, `users/${uid}/journals`), journalWithDate);
      console.log("Journal Document written with ID: ", docRef.id);
      console.log("New Journal: ", journalWithDate);
      return docRef.id;
    } catch (err) {
      console.error('Error adding new journal:', err);
      return null; 
    }
  }

export async function deleteJournal(userId, journalId) {
  try {
    const journalDocRef = doc(database, `users/${userId}/journals/${journalId}`);

    // Delete the journal document
    await deleteDoc(journalDocRef);

    console.log('Journal deleted successfully.');

    return true;
  } catch (error) {
    console.error('Error deleting journal:', error);
    return false;
  }
}

export async function editJournal(journalId, updatedJournal) {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log('User not authenticated');
        return false;
      }
  
      const uid = user.uid;
      const journalDocRef = doc(database, `users/${uid}/journals`, journalId);
  
      // Exclude 'date' field from the update
      const { date, ...updatedData } = updatedJournal;
  
      // Ensure 'date' is not present in updatedData
      if ('date' in updatedData) {
        console.warn('The "date" field should not be present in updatedData.');
        return false;
      }
  
      console.log('Updating journal with ID:', journalId);
      console.log('Updated Journal:', updatedData);
  
      // Update the journal document without the 'date' field
      await updateDoc(journalDocRef, updatedData);
  
      console.log('Journal updated successfully.');
  
      return true;
    } catch (error) {
      console.error('Error updating journal:', error);
      return false;
    }
  }
  
  

export async function addUser(user) {
    try {
        const docRef = await addDoc(collection(database, "users"), user);
        console.log("User Document written with ID: ", docRef.id);
        console.log("New User: ", user);
        return docRef.id;
        } catch (err) {
        console.error('Error adding new user:', err);
        return null; 
        }
    }

export async function deleteUser(uid) {
    try {
        await deleteDoc(doc(database, "users"), uid);
        console.log("User deleted with ID: ", uid);
        return true;
    } catch (err) {
        console.error('Error deleting user:', err);
        console.log(err);
    }
    }

export async function editUser(uid, updatedUser) {
    try {
        const userDocRef = doc(database, "users", uid);
        await updateDoc(userDocRef, updatedUser); 
        console.log("User updated with ID: ", uid);
        console.log("updatedUser: ", updatedUser);
        return true;
    } catch (error) {
        console.error('Error updating user:', error);
        return false;
    }
    }