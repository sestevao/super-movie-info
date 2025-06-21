// app/api/super-movie/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');
  if (!title) return NextResponse.json({ error: 'Movie title is required' }, { status: 400 });

  try {
    const movieRes = await axios.get(`https://www.omdbapi.com/?t=${title}&apikey=2a212831`);
    const movie = movieRes.data;

    if (movie.Response === 'False') {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }

    const wordList = ['lucid', 'ephemeral', 'catharsis', 'noir', 'serendipity'];
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    const dictRes = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`);
    const wordData = dictRes.data[0];

    const factRes = await axios.get('http://numbersapi.com/random/trivia');

    return NextResponse.json({
      title: movie.Title,
      year: movie.Year,
      director: movie.Director,
      actors: movie.Actors.split(', '),
      plot: movie.Plot,
      poster: movie.Poster,
      rating: movie.imdbRating,
      funFact: factRes.data,
      randomMovieImage: `https://picsum.photos/seed/${title}/600/400`,
      wordOfTheDay: {
        word: wordData.word,
        meaning: wordData.meanings[0]?.definitions[0]?.definition,
        example: wordData.meanings[0]?.definitions[0]?.example || 'No example available.'
      }
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch movie info', details: error.message }, { status: 500 });
  }
}
