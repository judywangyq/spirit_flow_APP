import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AddNewJournal from './AddNewJournal';

export default function Journal() {
  const navigation = useNavigation();

  const handleAddNew = () => {
    navigation.navigate('Add New Journal');
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
});
