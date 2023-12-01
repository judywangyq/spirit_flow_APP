import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, database } from "../firebase/firebaseSetup";
import { collection, query, getDocs } from 'firebase/firestore';

export default function Journal() {
  const navigation = useNavigation();
  const [userJournals, setUserJournals] = useState([]);

  useEffect(() => {
    const fetchUserJournals = async () => {
      try {
        const user = auth.currentUser;
        const uid = user.uid;

        const q = query(collection(database, `users/${uid}/journals`));
        const querySnapshot = await getDocs(q);

        const journalsData = [];
        querySnapshot.forEach((doc) => {
          const journal = doc.data();
          journalsData.push({
            id: doc.id,
            ...journal,
          });
        });

        setUserJournals(journalsData);
      } catch (error) {
        console.error('Error fetching user journals:', error);
      }
    };

    fetchUserJournals();
  }, [userJournals]);
  
  

  const handleAddNew = () => {
    navigation.navigate('Add New Journal');
    console.log('Add New button pressed');
  };

  const renderItem = ({ item }) => {
    const formattedDate = item.date ? new Date(item.date.seconds * 1000).toLocaleDateString() : '';

    return (
      <TouchableOpacity style={styles.journalItem} onPress={() => handleJournalPress(item)}>
        {item.date && <Text>Date: {formattedDate}</Text>}
        <Text>{item.positiveThoughts}</Text>
        <Text>{item.negativeThoughts}</Text>
        <Text>{item.energyRating}</Text>
      </TouchableOpacity>
    );
  };

  const handleJournalPress = (journal) => {
    navigation.navigate('Add New Journal', { editJournal: journal });
    console.log('Journal pressed:', journal);
  };

  return (
    <View>
      <FlatList
        data={userJournals}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <TouchableOpacity onPress={handleAddNew} style={styles.addButton}>
        <Text style={styles.buttonText}>Add New</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  journalItem: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
});
