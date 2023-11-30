import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebase from 'firebase/app';
import { database } from "../firebase/firebaseSetup"
import { serverTimestamp } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addJournal, deleteJournal, editJournal } from '../firebase/firestoreHelper'; 
import { auth } from '../firebase/firebaseSetup';
import LocationManager from '../components/LocationManager';


export default function AddNewJournal() {
  const navigation = useNavigation();
  const route = useRoute();
  const editJournalData = route.params?.editJournal;

  const [positiveThoughts, setPositiveThoughts] = useState('');
  const [negativeThoughts, setNegativeThoughts] = useState('');
  const [energyRating, setEnergyRating] = useState('');

  const [journalDate, setJournalDate] = useState(new Date());

  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (editJournalData) {
      setPositiveThoughts(editJournalData.positiveThoughts || '');
      setNegativeThoughts(editJournalData.negativeThoughts || '');
      setEnergyRating(editJournalData.energyRating?.toString() || '');
      setSelectedLocation(editJournalData.location);

      if (editJournalData.date && editJournalData.date.seconds) {
        const timestamp = editJournalData.date.seconds * 1000;
        setJournalDate(new Date(timestamp));
      }
    }
  }, [editJournalData]);

  const handleSave = async () => {

    console.log('Selected Location:', selectedLocation);

    if (!energyRating) {
      Alert.alert("Energy Rating can't be empty");
      return;
    }

    const currentDate = new Date(); // Get the current date
    const defaultDate = currentDate.toISOString(); // Convert to ISO string format  

    const newJournal = {
      positiveThoughts,
      negativeThoughts,
      energyRating: parseInt(energyRating, 10),
      date: defaultDate,
      location: {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      },
    };

    console.log('newJournal:', newJournal); 


    try {
      const user = auth.currentUser;
      if (!user) {
        console.log('User not authenticated');
        return;
      }
  
      const uid = user.uid;
  
      if (editJournalData) {
        await editJournal(editJournalData.id, newJournal);
        Alert.alert('Journal Updated', 'Journal has been updated successfully.');
      } else {
        await addJournal(uid, newJournal);
        Alert.alert('Journal Added', 'Journal has been added successfully.');
      }
  
      navigation.goBack();
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to save journal. Please try again.');
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleDelete = async () => {
    if (!editJournalData) {
      return;
    }

    try {

      const user = auth.currentUser;
      if (!user) {
        console.log('User not authenticated');
        return;
      }
  
      const uid = user.uid;

      await deleteJournal(uid, editJournalData.id);
      Alert.alert('Journal Deleted', 'Journal has been deleted successfully.');
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting journal:', error);
      Alert.alert('Error', 'Failed to delete journal. Please try again.');
    }
  };

  return (
    <ScrollView>
      <View>

        <View>
          <Text>Date: {journalDate.toISOString()}</Text>
        </View>

        <View>
          <Text>My Positive Thoughts:</Text>
          <TextInput
            placeholder="I feel happy..."
            value={positiveThoughts}
            onChangeText={setPositiveThoughts}
          />
        </View>

        <View>
          <Text>My Negative Thoughts:</Text>
          <TextInput
            placeholder="I feel upset..."
            value={negativeThoughts}
            onChangeText={setNegativeThoughts}
          />
        </View>

        <View>
          <Text>Energy Rating:</Text>
          <TextInput
            placeholder="*****"
            value={energyRating}
            onChangeText={setEnergyRating}
            keyboardType="numeric"
          />
        </View>

        <View>
          <Text>Location:</Text>
          <Text>{selectedLocation ? `${selectedLocation.latitude}, ${selectedLocation.longitude}` : 'Loading...'}</Text>
        </View>

        <LocationManager
          onLocationChange={(location) => setSelectedLocation(location)}
        />

        <Button title="Save" onPress={handleSave} />
        <Button title="Cancel" onPress={handleCancel} />
        {editJournalData && <Button title="Delete" onPress={handleDelete} />}
      </View>
    </ScrollView>
  );
}
