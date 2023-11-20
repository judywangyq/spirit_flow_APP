import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
// import "../style/tarot.css";
import { getRecommendedMovie } from '../components/movieService'
import { collection, onSnapshot, getDocs } from 'firebase/firestore';
import { database } from '../firebase/firebaseSetup';
import cardsImagePath from '../components/cardsPath';

function Home() {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [recommendedMovie, setRecommendedMovie] = useState(null);
  const [showCards, setShowCards] = useState(false);
  const [lastClickedDate, setLastClickedDate] = useState(null);

  useEffect(() => {
    fetchCards();
    displayStoredCards();
  }, []);

  const fetchCards = async () => {
    try {
      const tarotCardsCollection = collection(database, 'tarotcards');
      const querySnapshot = await getDocs(tarotCardsCollection);

      const tarotCardsData = [];
      querySnapshot.forEach((doc) => {
        tarotCardsData.push({ id: doc.id, ...doc.data() });
      });

      setCards(tarotCardsData);
    } catch (error) {
      console.error('Error fetching tarot cards:', error);
    }
  };

  useEffect(() => {
    displayStoredCards();
  }, [cards]);

  useEffect(() => {
    // console.log('Selected Cards:', selectedCards);
  }, [selectedCards]);
  


  const displayStoredCards = () => {
    const cardsStored = false; // Implement your logic here
    const lastClicked = new Date().toISOString().split('T')[0];

    if (cardsStored && lastClicked === lastClickedDate) {
      setShowCards(true);
    } else {
      generateCards();
    }
  };
  

  const generateCards = () => {
    if (cards.length > 0) {
      const randomCards = [];
      while (randomCards.length < 3) {
        const randomIndex = getRandomNumber(0, cards.length - 1);
        const randomCard = cards[randomIndex];
        if (!randomCards.includes(randomCard)) {
          randomCards.push(randomCard);
        }
      }
      setSelectedCards(randomCards);
      setShowCards(true);
      const currentDate = new Date().toISOString().split('T')[0];
      setLastClickedDate(currentDate);
    }
  };

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const fetchRecommendedMovie = async () => {
    let movie;

    // Try fetching a movie using each keyword
    for (let i = 0; i < selectedCards.length; i++) {
      const keyword = selectedCards[i].keywords;
      movie = await getRecommendedMovie(keyword);
      
      if (movie) {
        // Movie found, break out of the loop
        break;
      }
    }

    if (!movie) {
      // No movie found using any of the keywords, fetch a random movie
      movie = await getRandomMovie();
    }

    setRecommendedMovie(movie);
  };

  const getRandomMovie = async () => {
    const apiKey = '2e27f579';
    const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=random`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (data.Search && data.Search.length > 0) {
        // Retrieve a random movie from the search results
        const randomIndex = getRandomNumber(0, data.Search.length - 1);
        const randomMovie = data.Search[randomIndex];
        const movieDetails = await fetchMovieDetails(randomMovie.imdbID);
        return movieDetails;
      } else {
        throw new Error('No movies found');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch random movie');
    }
  };

  const fetchMovieDetails = async (imdbID) => {
    const apiKey = '2e27f579';
    const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&type=movie&i=${imdbID}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch movie details');
    }
  };

  const handleGetReading = () => {
    const lastClickedDate = localStorage.getItem('lastClickedDate');
    const currentDate = new Date().toISOString().split('T')[0];
    if (lastClickedDate === currentDate) {
      setShowCards(true);
    } else {
      generateCards();
    }
  }

  // const cardsImagePath = {
  //   c03: require('../assets/cards/c03.jpg'),
  //   p01: require('../assets/cards/p01.jpg'),
  //   w14: require('../assets/cards/w14.jpg'),
  // };
  // console.log(`${baseImagePath}${selectedCards[0].img}`);


  return (
    <ScrollView>

      <View style={styles.cardContainer}>
        {!showCards ? (
          <TouchableOpacity style={styles.button} onPress={handleGetReading}>
            <Text style={styles.buttonText}>Get Your Daily Divine Energy Reading</Text>
          </TouchableOpacity>
        ) : (
          <>
            <View style={styles.topCard}>

              <View style={styles.card}>
                <Image
                  source={cardsImagePath[selectedCards[0].img]}
                  style={styles.cardImage}
                  resizeMode="contain"
                />

                <Text style={styles.heading}>{selectedCards[0].name}</Text>
                <Text style={styles.text}>
                  Fortune Telling: {selectedCards[0].fortune_telling}
                </Text>
                <Text style={styles.text}>Keywords: {selectedCards[0].keywords}</Text>
                <Text style={styles.text}>
                  Questions to Ask: {selectedCards[0].questions_to_ask}
                </Text>

              </View>
            </View>

            <View style={styles.bottomCards}>
              {/* {selectedCards.slice(1).map((card) => (
                <View key={card.id} style={styles.bottomCard}>
                  <Text style={styles.heading}>{card.name}</Text>
                  <Text style={styles.text}>
                    Fortune Telling: {card.fortune_telling}
                  </Text>
                  <Text style={styles.text}>Keywords: {selectedCards[0].keywords}</Text>
                  <Text style={styles.text}>
                    Questions to Ask: {selectedCards[0].questions_to_ask}
                  </Text>
                </View>
              ))} */}
              <View style={styles.card}>
                <Image
                  source={cardsImagePath[selectedCards[1].img]}
                  style={styles.cardImage}
                  resizeMode="contain"
                />

                <Text style={styles.heading}>{selectedCards[1].name}</Text>
                <Text style={styles.text}>
                  Fortune Telling: {selectedCards[1].fortune_telling}
                </Text>
                <Text style={styles.text}>Keywords: {selectedCards[1].keywords}</Text>
                <Text style={styles.text}>
                  Questions to Ask: {selectedCards[1].questions_to_ask}
                </Text>
              </View>

              <View style={styles.card}>
                <Image
                  source={cardsImagePath[selectedCards[2].img]}
                  style={styles.cardImage}
                  resizeMode="contain"
                />

                <Text style={styles.heading}>{selectedCards[2].name}</Text>
                <Text style={styles.text}>
                  Fortune Telling: {selectedCards[2].fortune_telling}
                </Text>
                <Text style={styles.text}>Keywords: {selectedCards[1].keywords}</Text>
                <Text style={styles.text}>
                  Questions to Ask: {selectedCards[2].questions_to_ask}
                </Text>
              </View>



            </View>
            <TouchableOpacity style={styles.getMovieButton} onPress={fetchRecommendedMovie}>
              <Text style={styles.buttonText}>Daily movie for divine energy</Text>
            </TouchableOpacity>
              {recommendedMovie && (
                <View style={styles.recommendedMovie}>
                <Text style={styles.heading}>Recommended Movie</Text>
                <Text style={styles.text}>
                  Title: {recommendedMovie.Title}
                </Text>
                <Text style={styles.text}>
                  Year: {recommendedMovie.Year}
                </Text>
                <Text style={styles.text}>
                  Genre: {recommendedMovie.Genre}
                </Text>
                <Text style={styles.text}>
                  Plot: {recommendedMovie.Plot}
                </Text>
              </View>
            )}
          </>
        )}
      </View>

    </ScrollView>
  );
}

export default Home;


const styles = StyleSheet.create({
  getMovieButton: {
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
