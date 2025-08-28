import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SearchBar() {
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
    fetchMovies("Pirates of the Caribbean"); // default search
  }, []);

  // Fetch movies when searchTerm changes
  useEffect(() => {
    if (validateSearchTerm(searchTerm)) {
      fetchMovies(searchTerm);
    } else if (searchTerm.trim() === "") {
      fetchMovies("Pirates of the Caribbean"); // reset if cleared
    } else {
      setMovies([]);
    }
  }, [searchTerm]);

  return (
    <div className="p-6">
      <h1 className="pb-6 text-4xl text-center font-bold mb-4 text-[#00033D] font-mono">
        Search and get your favorite movie in an instant!
      </h1>

      {/* Search input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search your favorite movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border border-gray-300 rounded w-full max-w-md"
        />
      </div>

      {/* Loading/Error states */}
      {loading && <p className="text-center">Loading movies...</p>}
      {error && <p className="text-center text-red-600">{error.message}</p>}

      {/* Movies grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="p-4 border rounded shadow hover:shadow-lg transition"
          >
            <Link to={`/movie/${encodeURIComponent(movie.Title)}`}>
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
                alt={movie.Title}
                className="w-full h-64 object-cover rounded mb-2"
              />
              <h2 className="text-lg font-semibold">{movie.Title}</h2>
              <p className="text-gray-600">{movie.Year}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
