'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

type Movie = {
  title: string;
  year: string;
  poster: string;
  director: string;
  actors: string[];
  plot: string;
  rating: string;
  funFact: string;
  wordOfTheDay: {
    word: string;
    meaning: string;
    example: string;
  };
};

export default function Home() {
  const [movieTitle, setMovieTitle] = useState('');
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [data, setData] = useState<Movie | null>(null);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);


  // List of random movie titles
  const randomTitles = [
    'Inception',
    'The Matrix',
    'Pulp Fiction',
    'The Shawshank Redemption',
    'Interstellar',
    'Forrest Gump',
    'The Dark Knight',
  ];

  const fetchMovie = async () => {
    setLoading(true);
    try {
      let title = movieTitle.trim();

      if (!title) {
        // Pick a random title if input is empty
        title = randomTitles[Math.floor(Math.random() * randomTitles.length)];
      }

      const res = await axios.get(`/api/super-movie?title=${encodeURIComponent(title)}`);
      setData(res.data);
      setError('');
    } catch (err: any) {
      if (err.response?.status === 429) {
        setError('Too many requests! Please wait a moment and try again.');
      } else {
        setError(err.response?.data?.error || 'Error fetching data');
      }
      setData(null);
    }
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  // prevent page reload
    fetchMovie();
  };

  // Load favorites on mount
  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Check if current movie is favorited
  const isFavorited = data && (favorites as Movie[]).some(fav => fav.title === data.title);

  const toggleFavorite = () => {
    if (!data) return;
    const updated = isFavorited ? favorites.filter(fav => fav.title !== data.title) : [...favorites, data];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-6 transition-colors duration-500 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <div className="w-full max-w-md flex justify-center gap-6 items-center mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-blue-600 dark:text-yellow-400">
          🎬 Super Movie App
        </h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full focus:outline-none shadow-md transition-colors duration-300 ${
            darkMode
              ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 shadow-yellow-400/50'
              : 'bg-gray-800 text-white hover:bg-gray-700 shadow-gray-900/50'
          }`}
          aria-label="Toggle dark mode"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      <form onSubmit={(e) => {
          e.preventDefault();
          fetchMovie();
        }} className="flex justify-center items-center gap-4">
        <input
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          placeholder="Enter movie title..."
          className={`flex-grow rounded-lg border px-4 py-3 text-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
            darkMode
              ? 'bg-gray-800 border-gray-600 text-white focus:ring-yellow-400'
              : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
          }`}
          onKeyDown={(e) => {
            if (e.key === 'Enter') fetchMovie();
          }}
          type="text"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 transition-colors duration-300"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Get Movie Info'}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {data && (
        <Card darkMode={darkMode} className="w-full max-w-md shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 my-4">
          <CardHeader darkMode={darkMode}>
            <CardTitle darkMode={darkMode} className="text-2xl font-bold text-center ">{data.title} ({data.year})</CardTitle>

            <HeartIcon filled={isFavorited} onClick={toggleFavorite} />
          </CardHeader>

          <CardContent darkMode={darkMode}>
            <img
              src={data.poster}
              alt={data.title}
              className="w-full h-72 object-contain rounded mb-4"
            />
            <p>
              <span className="font-semibold">Director:</span> {data.director}
            </p>
            <p>
              <span className="font-semibold">Actors:</span> {data.actors.join(', ')}
            </p>
            <p className={`mt-2 italic ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {data.plot}
            </p>
            <p className="mt-2">
              <span className="font-semibold">IMDB Rating:</span> ⭐ {data.rating}
            </p>

            <div className={`mt-4 p-3 rounded-lg ${darkMode ? 'bg-indigo-900' : 'bg-indigo-50'}`}>
              <p className="font-semibold">🎲 Fun Fact:</p>
              <p className={darkMode ? 'text-indigo-300' : 'text-gray-700'}>{data.funFact}</p>
            </div>

            <div className={`mt-4 p-3 rounded-lg ${darkMode ? 'bg-yellow-800' : 'bg-yellow-50'}`}>
              <p className={darkMode ? 'font-semibold text-yellow-300' : 'font-semibold text-yellow-700'}>
                📚 Word of the Day:
              </p>
              <p className={darkMode ? 'text-yellow-300' : 'text-indigo-700'}>{data.wordOfTheDay.word}</p>
              <p className={darkMode ? 'text-yellow-300' : 'text-gray-700'}>{data.wordOfTheDay.meaning}</p>
              <p className={`italic mt-1 ${darkMode ? 'text-yellow-400' : 'text-gray-500'}`}>
                "{data.wordOfTheDay.example}"
              </p>
            </div>
          </CardContent>

        </Card>
      )}

      {favorites.length > 0 && (
        <section className="mt-8 w-full max-w-md">
          <h3 className="text-2xl font-semibold mb-4 text-center">❤️ Favorites</h3>
          <div className="space-y-4">
            {favorites.map((movie, i) => (
              <Card
                key={i}
                className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-100 transition-colors duration-300"
                darkMode={darkMode}
              >
                <div>
                  <p className="text-lg font-bold">{movie.title}</p>
                  <p className="text-sm text-gray-500">{movie.year}</p>
                </div>
                {/* Optionally add a small poster thumbnail */}
                {movie.poster && (
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-16 h-20 object-cover rounded"
                  />
                )}
              </Card>
            ))}
          </div>
        </section>
      )}

    </main>
  );
}

// HeartIcon component here or import if separated
function HeartIcon({ filled, onClick }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={filled ? 'red' : 'none'}
      stroke="red"
      strokeWidth="2"
      viewBox="0 0 24 24"
      onClick={onClick}
      className="w-6 h-6 transition-colors duration-300 cursor-pointer"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21c-4.97-4.5-8-7.36-8-10.5 0-2.48 1.75-4.5 4-4.5 1.54 0 3.04 1.02 4 2.5 0.96-1.48 2.46-2.5 4-2.5 2.25 0 4 2.02 4 4.5 0 3.14-3.03 6-8 10.5z"
      />
    </svg>
  );
}