import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function DetailPage() {
  const { title } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=bc92eef9&t=${encodeURIComponent(
            title
          )}&plot=full`
        );
        const data = await response.json();
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(new Error(data.Error || "Details not available"));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [title]);

  if (loading) {
    return <div className="text-center text-2xl font-bold">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-2xl font-bold text-red-600">
        <p>{error.message}</p>
        <Link to="/" className="text-blue-500 underline">
          Go back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="detail-page p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
        alt={movie.Title}
        className="w-60 rounded-lg shadow-lg mb-4"
      />
      <p>
        <strong>Year:</strong> {movie.Year}
      </p>
      <p>
        <strong>Genre:</strong> {movie.Genre}
      </p>
      <p>
        <strong>Cast:</strong> {movie.Actors}
      </p>
      <p>
        <strong>Director:</strong> {movie.Director}
      </p>
      <p>
        <strong>Ratings:</strong> {movie.imdbRating} / 10
      </p>
      <p className="mt-4">
        <strong>Plot:</strong> {movie.Plot}
      </p>

      <Link
        to="/"
        className="inline-block mt-6 bg-[#00033D] text-white px-4 py-2 rounded hover:bg-[#00033D]/80 transition"
      >
        Back to Search
      </Link>
    </div>
  );
}

export default DetailPage;
