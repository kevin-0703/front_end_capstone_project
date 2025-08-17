import { useState, useEffect } from "react";
function HomePage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const validateSearchTerm = (term) => {
        return term.trim !== "" && term.length >= 3;
    }
    useEffect(() => {
        const fetchmovies = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://img.omdbapi.com/?apikey=[bc92eef9]&')
                    .then((response) => response.json())
                    .then((jsonData) => { setMovies(jsonData) })
                    .catch((error) => console.error("No movies found", error))
            };
        };
    });
    return (
        <>
            <div className="homepage">
                <h1>Welcome to CineMate! Home of all entertainment you need for a life time.</h1>
                <input type="text" placeholder="Search your favorite movies" onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="movie-list">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
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
    
 