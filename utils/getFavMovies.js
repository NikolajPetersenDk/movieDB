// This is called in /components/FavBtn.js
   // Its used to fetch the data of the 'favoriteMovies' column from Supabase

import { supabase } from "./supabaseClient";

export async function getFavMovies(setFavMovies) {
   try {
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
         .from('users')
         .select('favoriteMovies')
         .eq('id', user.id)
         .single()

      if (error && status !== 406) throw error

      if (data) setFavMovies(data.favoriteMovies)
   }

   catch (error) {alert(error.message)}
}