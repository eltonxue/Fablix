(SELECT *
  FROM movies
  JOIN ratings ON movies.id = ratings.movieId ORDER BY rating DESC LIMIT 20);

-- ID = tt0395642 --

SELECT starId FROM stars_in_movies WHERE stars_in_movies.movieId = 'tt0395642';

SELECT name FROM (
  SELECT starId
  FROM stars_in_movies
  WHERE stars_in_movies.movieId = 'tt0395642'
) AS starIds JOIN stars ON starIds.starId = stars.id;

SELECT genreId FROM genres_in_movies WHERE genres_in_movies.movieId = 'tt0395642';

SELECT name FROM (
  SELECT genreId
  FROM genres_in_movies
  WHERE genres_in_movies.movieId = 'tt0395642'
) AS genreIds JOIN genres ON genreIds.genreId = genres.id;
