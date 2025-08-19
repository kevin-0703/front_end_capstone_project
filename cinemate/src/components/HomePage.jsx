import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
      <div className="bg-[#F2E6EE] p-4 flex flex-col items-center justify-center">
        <h1 className="text-6xl text-center font-bold mb-4 text-[#00033D] font-mono">
          Welcome to CineMate! Home of all entertainment you need for a
          lifetime.
        </h1>
        <input
          type="text"
          placeholder="Search your favorite movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-4 w-full max-w-md"
        />
        <button
          onClick={() => {
            if (validateSearchTerm(searchTerm)) {
              fetchMovies(searchTerm);
            } else {
              alert("Please enter at least 3 characters to search.");
            }
          }}
          className="bg-[#00033D] text-white px-4 py-2 rounded hover:bg-[#00033D]/80 transition-colors"
        >
          Search
        </button>
      </div>
      <div className="bg-[#F2E6EE] lg:flex-col">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
        {!loading && !error && movies.length === 0 && <p>No movies found.</p>}
        {!loading && !error && movies.length > 0 && (
          <ul className="grid grid-cols-1  items-center justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map((movie) => (
              <li key={movie.imdbID}>
                <h2 className="text-[#00033D] font-bold ">{movie.Title}</h2>
                <Link to={`/movie/${movie.imdbID}`}>
                  <img
                    className="transition-transform duration-300 hover:scale-105 rounded-lg shadow-lg cursor-pointer"
                    src={movie.Poster}
                    alt={movie.Title}
                  />
                </Link>
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
