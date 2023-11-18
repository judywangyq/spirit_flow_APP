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