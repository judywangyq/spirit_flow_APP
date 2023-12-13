import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, database } from "../firebase/firebaseSetup";
import { collection, query, getDocs } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart } from 'react-native-chart-kit';
import Colors from '../components/Colors';

export default function Journal() {
  const navigation = useNavigation();
  const [userJournals, setUserJournals] = useState([]);

  const [chartData, setChartData] = useState([]);

  // useEffect(() => {
  //   const fetchUserJournals = async () => {
  //     try {
  //       const user = auth.currentUser;
  //       const uid = user.uid;

  //       const q = query(collection(database, `users/${uid}/journals`));
  //       const querySnapshot = await getDocs(q);

  //       const journalsData = [];
  //       querySnapshot.forEach((doc) => {
  //         const journal = doc.data();
  //         journalsData.push({
  //           id: doc.id,
  //           ...journal,
  //         });
  //       });

  //       setUserJournals(journalsData);
  //     } catch (error) {
  //       console.error('Error fetching user journals:', error);
  //     }
  //   };

  //   fetchUserJournals();
  // }, [userJournals]);

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUserJournals = async () => {
      try {
        const user = auth.currentUser;

        // Check if the user is authenticated before fetching journals
        if (user) {
          setAuthenticated(true);
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

          //sort by date
          // journalsData.sort((a, b) => b.date.seconds - a.date.seconds);
          journalsData.sort((a, b) => b.date - a.date);

          setUserJournals(journalsData);

          // Extract data for the line chart (date and energy level)
          const chartData = journalsData.slice(0,5).map((journal) => ({
            date: journal.date ? journal.date.seconds * 1000 : null, // Check if date exists
            energyLevel: journal.energyRating,
          })).filter((data) => data.date !== null); // Filter out entries with null dates              

          setChartData(chartData);

        } else {
          setAuthenticated(false);
          setUserJournals([]);
          setChartData([]);

        }
      } catch (error) {
        if (auth.currentUser) {
          console.error('Error fetching user journals:', error);
        }
      }
    };

    fetchUserJournals();
  }, [userJournals]);

  // Render the component only if the user is authenticated
  if (!authenticated) {
    return <Text>You are not signed in.</Text>;
  }

  const handleAddNew = () => {
    navigation.navigate('Add New Journal');
    console.log('Add New button pressed');
  };

  const ratingConvert = (rating) => {
    switch (rating) {
      case 1:
        return '*';
      case 2:
        return '**';
      case 3:
        return '***';
      case 4:
        return '****';
      case 5:
        return '*****';
      default:
        return '';
    }
  };

  const renderItem = ({ item }) => {
    const formattedDate = item.date ? new Date(item.date.seconds * 1000).toLocaleDateString() : '';

    return (
      <TouchableOpacity style={styles.journalItem} onPress={() => handleJournalPress(item)}>
        {item.date && <Text>Date: {formattedDate}</Text>}
        <Text>I felt positive that: {item.positiveThoughts}</Text>
        <Text>I am working on: {item.negativeThoughts}</Text>
        <Text>My Energy at the moment was rated at: {ratingConvert(item.energyRating)}</Text>
      </TouchableOpacity>
    );
  };

  const handleJournalPress = (journal) => {
    navigation.navigate('Add New Journal', { editJournal: journal });
    console.log('Journal pressed:', journal);
  };

  return (
    <><LinearGradient
      colors={[
        Colors.Top,
        Colors.Bottom,
      ]} 
      style={styles.background}/>
    <View>
      <TouchableOpacity onPress={handleAddNew} style={styles.addButton}>
        <Text style={styles.buttonText}>Add New</Text>
      </TouchableOpacity>

      {/* Line Chart */}
      {chartData.length > 0 && (
        <LineChart
          data={{
            labels: chartData.map((data) => new Date(data.date).toLocaleDateString()).reverse(),
            datasets: [
              {
                data: chartData.map((data) => data.energyLevel).reverse(),
              },
            ],
          }}
          width={350} // from react-native
          height={220}
          yAxisLabel="Level"
          yAxisSuffix=""
          withVerticalLabels={true} // Show vertical labels on the Y-axis
          chartConfig={{
            backgroundColor: 'transparent', // Fully transparent background
            // backgroundColor: 'white',
            backgroundGradientFrom: 'white',
            backgroundGradientTo: 'white',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '5',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
            alignSelf: 'center', // Center the chart horizontally
          }}
          contentInset={{ left: 20, right: 20 }}
          // spacingInner={0.5} // Adjust the spacing between bars
        />
      )}
      
      <FlatList
        data={userJournals}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

    </View>
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
  addButton: {
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
  journalItem: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
});
