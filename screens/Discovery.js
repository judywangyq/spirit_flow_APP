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
        const user = auth.currentUser;
        const uid = user.uid;
  
        const q = query(collection(database, `users/${uid}/journals`));
        const querySnapshot = await getDocs(q);
  
        const locations = querySnapshot.docs.map((doc) => doc.data().location);
  
        console.log('Locations:', locations); 
        setMarkers(locations);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
  
    fetchLocations();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 49.28088,
          longitude: -12311574,
          // latitudeDelta: 0.0922,
          // longitudeDelta: 0.0421,
        }}
      >

        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={`Energy Level: ${marker.energyLevel}`}
          />
        ))}
      </MapView>
    </View>
  );
}
