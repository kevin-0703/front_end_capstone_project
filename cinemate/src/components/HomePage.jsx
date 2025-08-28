import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import menu_open from "./menu_open.png";
import mobile_friendly from "./mobile_friendly.png";
import search from "./Search.png";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    fetchMovies("Pirates of the Caribbean"); // default category
  }, []);

  return (
    <>
      {/* Header */}
      <div className="bg-[#F2E6EE] p-4 flex flex-col items-center justify-center relative">
        <h1 className="text-6xl text-center font-bold mb-4 text-[#00033D] font-mono pb-[60px] pt-[90px]">
          Welcome to CineMate! Home of all entertainment you need for a
          lifetime.
        </h1>

        {/* Icons Navigation */}
        <div className="absolute top-6 right-6 flex space-x-4">
          {/* Search page */}
          <Link to="/search">
            <img
              src={search}
              alt="Search Icon"
              className="w-10 h-10 cursor-pointer hover:scale-110 transition"
            />
          </Link>

          {/* Contact page */}
          <Link to="/contact">
            <img
              src={mobile_friendly}
              alt="Contact Icon"
              className="w-10 h-10 cursor-pointer hover:scale-110 transition"
            />
          </Link>
        </div>
      </div>

      {/* Movies Section */}
      <div className="bg-[#F2E6EE] lg:flex-col pr-[40px] pl-[40px]">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
        {!loading && !error && movies.length === 0 && <p>No movies found.</p>}

        {!loading && !error && movies.length > 0 && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <li key={movie.imdbID}>
                <h2 className="text-[#00033D] font-bold mb-2">{movie.Title}</h2>
                <Link to={`/movie/${encodeURIComponent(movie.Title)}`}>
                  <img
                    className="transition-transform duration-300 hover:scale-105 rounded-lg shadow-lg cursor-pointer"
                    src={
                      movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"
                    }
                    alt={movie.Title}
                  />
                </Link>
                <p className="text-gray-600">Year: {movie.Year}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default HomePage;
