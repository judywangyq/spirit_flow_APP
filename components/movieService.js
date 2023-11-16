export const getRecommendedMovie = async (keywords) => {
    const apiKey = '2e27f579';
    const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${keywords}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (data.Search && data.Search.length > 0) {
        // Randomly select a movie from the search results
        const randomIndex = Math.floor(Math.random() * data.Search.length);
        const randomMovie = data.Search[randomIndex];
        const movieDetails = await fetchMovieDetails(randomMovie.imdbID);
        return movieDetails;
      } else {
        throw new Error('No movies found');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch movie recommendation');
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
  