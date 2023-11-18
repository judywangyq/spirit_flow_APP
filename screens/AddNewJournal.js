import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { deleteJournal, editJournal } from '../firebase/firestoreHelper'; 

export default function AddNewJournal() {
  const navigation = useNavigation();
  const route = useRoute();
  const editItem = route.params?.editItem;

  const [positiveThoughts, setPositiveThoughts] = useState('');
  const [nagativeThoughts, setNagativeThoughts] = useState('');
  const [energyRating, setEnergyRating] = useState('');

  const handleSave = async () => {
    if (!energyRating) {
      Alert.alert("Energy Rating can't be empty");
      return;
    }
    navigation.goBack();
  };

  const handleCancel = async () => {
    navigation.goBack();
  };

  const handleDelete = async () => {
    try {
      await deleteJournal(editJournal.id);
      console.log(" deleted", editJournal.id);
      Alert.alert('Journal Deleted', 'Journal has been deleted successfully.');
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting journal:', error);
      Alert.alert('Error', 'Failed to delete journal. Please try again.');
    }
  };

  return (
    <View>
      {/* <Text>Add A New Journal</Text> */}
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
          value={nagativeThoughts}
          onChangeText={setNagativeThoughts}
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

      <Button title="Save" onPress={handleSave} />
      <Button title="Cancel" onPress={handleCancel} />
      <Button title="Delete" onPress={handleDelete} />

    </View>
  );
}


// import React from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

// export default function AddNewJournal() {

//   const handleNewHournal = () => {
//     console.log('Add New Journal Page');
//   };

//   return (
//     <View>
//       <Text style={styles.Text}>Add New Journal</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   Text: {
//     color: 'blue',
//     fontSize: 16,
//   },
// });

