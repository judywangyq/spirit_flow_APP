import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { database } from "./firebaseSetup";

///////  firebase is not ready!!!!//////////

export async function addJournal(journal) {
    try {
        const docRef = await addDoc(collection(database, "journals"), journal);
        console.log("Journal Document written with ID: ", docRef.id);
        console.log("New Journal: ", journal);
        return docRef.id;
      } catch (err) {
        console.error('Error adding new journal:', err);
        return null; 
      }
    }

export async function deleteJournal(journalId) {
    try {
        await deleteDoc(doc(database, "journals"), journalId);
        console.log("Journal deleted with ID: ", journalId);
        return true;
    } catch (err) {
        console.error('Error deleting journal:', err);
        console.log(err);
    }
    }

export async function editJournal(journalId, updatedJournal) {
    try {
        const journalDocRef = doc(database, "journals", journalId);
        await updateDoc(journalDocRef, updatedJournal); 
        console.log("Journal updated with ID: ", journalId);
        console.log("updatedJournal: ", updatedJournal);
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