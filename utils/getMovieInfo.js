/* Called in /pages/account.js
   - It's used to:
      - fetch movie data from TMDB API, with their id
      - set 'movieList' to an array containing each fav movies title and id [[movie.title, movie.id]]
      - set 'favoriteMovies' state in account.js to movieLIst
*/

export async function getMovieInfo(favoriteMovies, setFavMovies) {
   let movieList = []

   favoriteMovies.map((movie) => {
      fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=2e28a26a70c14a7b5e9a16e05864446a&language=en-US`)
      .then((res) => res.json())
      .then((data) => {
         movieList = [...movieList, [data.title, data.id]]
         setFavMovies(movieList)
      })
   })
}
