/* Called in pages/movies/[mid].js 
   This components
      - checks if a user is logged in (with session())
      - fetches the user's favorite movies (with getFavMovies())
      - creates a button element
         - This button calls addToFav()
         - This adds the current movie the users favoriteMovies (unless the movie already is favorited)
*/

import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa"
import { getFavMovies } from "../utils/getFavMovies";
import { supabase } from "../utils/supabaseClient"


function FavBtn({movieId}) {
   const [favMovies, setFavMovies] = useState([]);
   const [session, setSession] = useState(null);

   useEffect(() => {
      if (session) getFavMovies(setFavMovies)
      setSession(supabase.auth.session())
   },[session]);


   async function addToFav({movieId}) {

      // If the movie has NOT been favorited
      if (!favMovies.includes(movieId)) {
         try {
               const user = supabase.auth.user()

               let { error } = await supabase
                  .from('users')
                  .upsert({id: user.id, favoriteMovies: [...favMovies, movieId]}, {
                     returning: 'minimal'
                  })

                  if (error) {
                     throw error
                  }
                  alert('Movie added to favorites')

                  getFavMovies(setFavMovies)
            }
            catch (error) {
               alert('huh')
            }
         }
      else alert('Movie already added to favorites')
   }

   if (!session) return <></>
 
   return (
      <button
         className="h-fit w-fit p-2"
         onClick={() => {
            addToFav({movieId})
         }}
      >
         <FaStar/>
      </button>
  )
}

export default FavBtn