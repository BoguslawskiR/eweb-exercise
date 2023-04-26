import { Genre, Movie } from "./index.types"
import db from './db.json';

export const getFilteredMovies = ({ genres }: { genres: Genre[] }): Movie[] => {
  const movies = [...db.movies] as Movie[];
  if (genres.length === 0) return [movies[Math.floor(Math.random() * (db.movies.length - 1))]]
  const result = {} as Record<number, Movie[]>;
  movies.forEach((movie) => {
    const genresMathes = movie.genres.filter((genre) => genres.includes(genre)).length; // O(n)
    if (genresMathes === 0) return;
    if (!result[genresMathes]) result[genresMathes] = [movie];
    else result[genresMathes].push(movie);
  });
  return Object
    .keys(result)
    .sort()
    .reduce(
      (acc, key) => {
        console.log(acc.length, key, result[Number(key)].length, 'RESULT');
        return [
          ...result[Number(key)],
          ...acc
        ];
      },
      [] as Movie[]
    );
}
