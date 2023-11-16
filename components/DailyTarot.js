import React, { useEffect, useState } from 'react';
// import "../style/tarot.css";
import { getRecommendedMovie } from './movieService'
import { collection, onSnapshot } from 'firebase/firestore';
import { database } from '../firebase/firebaseSetup';

function DailyTarot() {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [recommendedMovie, setRecommendedMovie] = useState(null);
  const [showCards, setShowCards] = useState(false);

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


  const displayStoredCards = () => {
    const storedCards = JSON.parse(localStorage.getItem('selectedCards'));
    const lastClickedDate = localStorage.getItem('lastClickedDate');
    const currentDate = new Date().toISOString().split('T')[0];
    
    if (storedCards && storedCards.length === 3 && lastClickedDate === currentDate) {
      setSelectedCards(storedCards);
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
      localStorage.setItem('selectedCards', JSON.stringify(randomCards));
      setShowCards(true);  // Set showCards to true after generating cards
      const currentDate = new Date().toISOString().split('T')[0];
      localStorage.setItem('lastClickedDate', currentDate);
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


  return (
    <div className="card-container">
      {! showCards ? (
        <button onClick={handleGetReading}>Get Your Daily Divine Energy Reading</button>
      ) : (
        <>
          <div className="top-card">
            <div className="card">
              <h2>{selectedCards[0].name}</h2>
              <img src={`${process.env.PUBLIC_URL}/cards/${selectedCards[0].img}`} alt={selectedCards[0].name} />
              <p>Fortune Telling: {selectedCards[0].fortune_telling}</p>
              <p>Keywords: {selectedCards[0].keywords}</p>
              <p>Questions to Ask: {selectedCards[0].questions_to_ask}</p>
            </div>
          </div>
          <div className="bottom-cards">
            {selectedCards.slice(1).map(card => (
              <div key={card.id} className="card bottom-card">
                <h2>{card.name}</h2>
                <img src={`${process.env.PUBLIC_URL}/cards/${card.img}`} alt={card.name} />
                <p>Fortune Telling: {card.fortune_telling}</p>
                <p>Keywords: {card.keywords}</p>
                <p>Questions to Ask: {card.questions_to_ask}</p>
              </div>
            ))}
          </div>
          <button className="get-movie-button" onClick={fetchRecommendedMovie}>Daily movie for divine energy</button>
          {recommendedMovie && (
            <div className="recommended-movie">
              <h2>Recommended Movie</h2>
              <p>Title: {recommendedMovie.Title}</p>
              <p>Year: {recommendedMovie.Year}</p>
              <p>Genre: {recommendedMovie.Genre}</p>
              <p>Plot: {recommendedMovie.Plot}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DailyTarot;