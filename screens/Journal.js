import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import AddNewJournal from './AddNewJournal';

export default function Journal() {
  const handleAddNew = () => {
    console.log('Add New button pressed');
  };

  return (
    <View>
      <TouchableOpacity onPress={handleAddNew} style={styles.addButton}>
        <Text style={styles.buttonText}>Add New</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
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
};
