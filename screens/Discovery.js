import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { collection, query, getDocs } from 'firebase/firestore';
import { database, auth } from '../firebase/firebaseSetup'; 

export default function Discovery() {
  const navigation = useNavigation();
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        // const user = auth.currentUser;
        // const uid = user.uid;
  
        // const q = query(collection(database, `users/${uid}/journals`));
        const q = query(collection(database, 'users'));

        const querySnapshot = await getDocs(q);
  
        // const locations = querySnapshot.docs.map((doc) => ({
        //   location: doc.data().location,
        //   energyRating: doc.data().energyRating, 
        // }));
  
        // console.log('Locations:', locations); 
        // setMarkers(locations);



        const allUserLocations = [];

        for (const userDoc of querySnapshot.docs) {
          console.log('User document:', userDoc.data());

          const journalsCollection = query(collection(database, `users/${userDoc.id}/journals`));
          try {
            const journalsSnapshot = await getDocs(journalsCollection);
          
            if (!journalsSnapshot.empty) {
              journalsSnapshot.forEach((journalDoc) => {
                const journalData = journalDoc.data();
                console.log('Journal:', journalData);
          
                allUserLocations.push({
                  location: journalData.location,
                  energyRating: journalData.energyRating,
                });
              });
            } else {
            console.log('No journals found for user:', userDoc.id);
          }
        } catch (error) {
          console.error('Error fetching journals subcollection:', error);
        }
      }

        setMarkers(allUserLocations);

      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
  
    fetchLocations();
  }, []);

  const getPinColor = (energyRating) => {
    switch (energyRating) {
      case 1:
        return 'black';
      case 2:
        return 'yellow';
      case 3:
        return 'green';
      case 4:
        return 'blue';
      case 5:
        return 'red';
      default:
        return 'pink'; 
    }
  };
  

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 49.28088,
          longitude: -123.11574,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >

        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.location.latitude, longitude: marker.location.longitude }}
            title={`Energy Level: ${marker.energyRating}`}
            pinColor={getPinColor(marker.energyRating)}
          />
        ))}
      </MapView>
    </View>
  );
}
