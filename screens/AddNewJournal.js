import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebase from 'firebase/app';
import { database } from "../firebase/firebaseSetup"
import { serverTimestamp } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addJournal, deleteJournal, editJournal } from '../firebase/firebaseHelper'; 
import { auth } from '../firebase/firebaseSetup';
import LocationManager from '../components/LocationManager';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../components/Colors';
import MapView, { Marker } from 'react-native-maps';

export default function AddNewJournal() {
  const navigation = useNavigation();
  const route = useRoute();
  const editJournalData = route.params?.editJournal;

  // const routeSelectedLocation = route.params?.selectedLocation;

  const [positiveThoughts, setPositiveThoughts] = useState('');
  const [negativeThoughts, setNegativeThoughts] = useState('');
  const [energyRating, setEnergyRating] = useState('');

  const [journalDate, setJournalDate] = useState(new Date());

  const [selectedLocation, setSelectedLocation] = useState(null);

  // useEffect(() => {
  //   console.log('Route Params:', route.params);
  //   console.log('Selected Location from Route Params:', routeSelectedLocation);
  //   console.log('Selected Location from "Locate Me!":', selectedLocation);
  // }, [routeSelectedLocation, selectedLocation, route.params]);

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

    // const effectiveSelectedLocation = selectedLocation || routeSelectedLocation;

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
        // latitude: effectiveSelectedLocation.latitude,
        // longitude: effectiveSelectedLocation.longitude,
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
    <><LinearGradient
      colors={[
        Colors.Top,
        Colors.Bottom,
      ]} 
      style={styles.background}/>

    <ScrollView>
      <View>

        <View style={styles.inputContainer}>
          <Text  style={styles.label}>Date: {journalDate.toISOString()}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>My Positive Thoughts:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="I feel happy..."
            value={positiveThoughts}
            onChangeText={setPositiveThoughts}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>My Negative Thoughts:</Text>
          <TextInput
          style={styles.textInput}
            placeholder="I feel upset..."
            value={negativeThoughts}
            onChangeText={setNegativeThoughts}
          />
        </View>

        {/* <View>
          <Text>Energy Rating:</Text>
          <TextInput
            placeholder="*****"
            value={energyRating}
            onChangeText={setEnergyRating}
            keyboardType="numeric"
          />
        </View> */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Energy Rating:</Text>
          <Picker
            style={styles.picker}
            selectedValue={energyRating}
            onValueChange={(itemValue) => setEnergyRating(itemValue)}
          >
            <Picker.Item label="*" value="1" />
            <Picker.Item label="**" value="2" />
            <Picker.Item label="***" value="3" />
            <Picker.Item label="****" value="4" />
            <Picker.Item label="*****" value="5" />
          </Picker>
        </View>

        <View>
          <Text>Location:</Text>
          <Text>{selectedLocation ? `${selectedLocation.latitude}, ${selectedLocation.longitude}` : 'Loading...'}</Text>
        </View>

        {editJournalData && selectedLocation && (
            <MapView
              style={{ height: 200, marginVertical: 10 }}
              initialRegion={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: selectedLocation.latitude,
                  longitude: selectedLocation.longitude,
                }}
                title="Selected Location"
              />
            </MapView>
          )}

        {/* <View>
          <Text>Location:</Text>
          <Text>
            {selectedLocation
              ? `${selectedLocation.latitude}, ${selectedLocation.longitude}`
              : routeSelectedLocation
              ? `${routeSelectedLocation.latitude}, ${routeSelectedLocation.longitude}`
              : 'Loading...'}
          </Text>
        </View> */}

        <LocationManager
          onLocationChange={(location) => setSelectedLocation(location)}
        />

        <Button title="Save" onPress={handleSave} />
        <Button title="Cancel" onPress={handleCancel} />
        {editJournalData && <Button title="Delete" onPress={handleDelete} />}
      </View>
    </ScrollView>
    </>
  );
}


const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 900,
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
  },
  picker: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});