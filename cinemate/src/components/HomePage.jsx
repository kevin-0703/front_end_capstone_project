import { useState, useEffect } from "react";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const validateSearchTerm = (term) => {
    return term.trim() !== "" && term.length >= 3;
  };

  // Reusable fetch function
  const fetchMovies = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=bc92eef9&s=${encodeURIComponent(
          query
        )}`
      );
      const jsonData = await response.json();

      if (jsonData.Response === "True") {
        setMovies(jsonData.Search);
      } else {
        setMovies([]);
        setError(new Error(jsonData.Error || "No movies found"));
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Load default movies on first page load
  useEffect(() => {
    fetchMovies("Pirates of the caribbean"); // default category
  }, []);

  // Fetch movies when searchTerm changes
  useEffect(() => {
    if (validateSearchTerm(searchTerm)) {
      fetchMovies(searchTerm);
    } else if (searchTerm.trim() === "") {
      fetchMovies("Pirates of the caribbean"); // reset to default if search cleared
    } else {
      setMovies([]);
    }
  }, [searchTerm]);

  return (
    <>
      <div className="homepage">
        <h1>
          Welcome to CineMate! Home of all entertainment you need for a
          lifetime.
        </h1>
        <input
          type="text"
          placeholder="Search your favorite movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="movie-list">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
        {!loading && !error && movies.length === 0 && <p>No movies found.</p>}
        {!loading && !error && movies.length > 0 && (
          <ul>
            {movies.map((movie) => (
              <li key={movie.imdbID}>
                <h2>{movie.Title}</h2>
                <img src={movie.Poster} alt={movie.Title} />
                <p>Year: {movie.Year}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default HomePage;
